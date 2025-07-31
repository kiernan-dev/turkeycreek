import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Wrench, User, Bot, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  appointmentData?: AppointmentSuggestion;
}

interface AppointmentSuggestion {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceType?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  description?: string;
  isEmergency?: boolean;
}

export default function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize chat with welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: "Hello! I'm your 24/7 assistant for Turkey Creek Cycles. I can help you with:\n\n• 📅 Scheduling appointments\n• 🔧 Technical V-Twin motorcycle questions\n• 💰 Service information and pricing\n• 📍 Shop hours and location\n• 🏗️ Custom build consultations\n• 🚨 Emergency assistance\n\n*Working offline with guided assistance*\n\nHow can I help you today?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          context: "Turkey Creek Cycles motorcycle shop assistant",
          sessionId: sessionId
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      // Check if response contains appointment scheduling keywords  
      const appointmentKeywords = ['schedule', 'appointment', 'book', 'visit', 'come in', 'bring my bike'];
      const isAboutAppointment = appointmentKeywords.some(keyword => 
        inputValue.toLowerCase().includes(keyword) || data.response.toLowerCase().includes(keyword)
      );
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);

      // Check if user provided appointment details (email and phone pattern)
      const appointmentData = parseAppointmentFromMessage(inputValue);
      if (appointmentData) {
        scheduleAppointment(appointmentData);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again or contact us directly at (913) 724-3704.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const scheduleAppointment = async (appointmentData: AppointmentSuggestion) => {
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error("Failed to schedule appointment");
      }

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Appointment Scheduled!",
          description: "We'll contact you to confirm your appointment details.",
        });
        
        const confirmationMessage: Message = {
          id: Date.now().toString(),
          text: "✅ Perfect! Your appointment has been scheduled successfully. We'll contact you within 24 hours to confirm the details and answer any questions you might have.\n\nIs there anything else I can help you with?",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, confirmationMessage]);
      }
    } catch (error) {
      toast({
        title: "Scheduling Error",
        description: "There was an issue scheduling your appointment. Please call us at (913) 724-3704.",
        variant: "destructive",
      });
    }
  };

  const parseAppointmentFromMessage = (message: string): AppointmentSuggestion | null => {
    // Enhanced parsing for appointment details
    const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/;
    const phoneRegex = /(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/;
    const nameRegex = /(?:name[:\s]*|i'm|i am)\s*([a-zA-Z\s]+)(?:\s|$)/i;
    const dateRegex = /(\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}-\d{1,2}-\d{4}|january|february|march|april|may|june|july|august|september|october|november|december|\d{1,2}th|\d{1,2}st|\d{1,2}nd)/i;
    const timeRegex = /(\d{1,2}:\d{2}\s?(?:am|pm)?|\d{1,2}\s?(?:am|pm))/i;
    
    const email = message.match(emailRegex)?.[0];
    const phone = message.match(phoneRegex)?.[0];
    const nameMatch = message.match(nameRegex)?.[1]?.trim();
    const dateMatch = message.match(dateRegex)?.[0];
    const timeMatch = message.match(timeRegex)?.[0];
    
    // Service type detection
    let serviceType = 'General Service';
    if (message.toLowerCase().includes('engine') || message.toLowerCase().includes('rebuild')) {
      serviceType = 'Engine Rebuild/Performance';
    } else if (message.toLowerCase().includes('custom') || message.toLowerCase().includes('build')) {
      serviceType = 'Custom Fabrication';
    } else if (message.toLowerCase().includes('repair') || message.toLowerCase().includes('fix')) {
      serviceType = 'Service & Repair';
    } else if (message.toLowerCase().includes('consultation') || message.toLowerCase().includes('advice')) {
      serviceType = 'Consultation';
    }
    
    if (email && phone) {
      return {
        customerName: nameMatch || '',
        customerEmail: email,
        customerPhone: phone,
        appointmentDate: dateMatch || '',
        appointmentTime: timeMatch || '',
        description: message,
        serviceType: serviceType,
        isEmergency: message.toLowerCase().includes('emergency') || message.toLowerCase().includes('urgent')
      };
    }
    
    return null;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-tcc-orange hover:bg-tcc-orange-bright text-white rounded-full p-4 shadow-lg transition-all duration-300 group"
        whileHover={{ 
          scale: 1.05,
        }}
        whileTap={{ scale: 0.95 }}
        animate={
          isOpen 
            ? { opacity: 0, pointerEvents: "none" } 
            : { 
                opacity: 1, 
                pointerEvents: "auto",
                boxShadow: [
                  "0 4px 14px 0 rgba(255, 102, 0, 0.3)",
                  "0 4px 14px 0 rgba(255, 102, 0, 0.5)",
                  "0 4px 14px 0 rgba(255, 102, 0, 0.3)"
                ]
              }
        }
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <MessageCircle className="h-6 w-6" />
        
        {/* Subtle pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-tcc-orange opacity-75"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.75, 0.3, 0.75]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Online indicator dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
          <motion.div
            className="w-full h-full bg-green-400 rounded-full"
            animate={{
              opacity: [1, 0.6, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 right-6 w-96 h-[500px] z-50 bg-white dark:bg-tcc-dark-gray border border-gray-200 dark:border-steel rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-tcc-orange text-white p-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="relative bg-white/20 p-2 rounded-full">
                  <Wrench className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Turkey Creek Cycles</h3>
                  <div className="flex items-center space-x-2 text-sm opacity-90">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>24/7 Assistant Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-tcc-dark-gray scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-steel scrollbar-track-transparent">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="bg-tcc-orange/10 p-3 rounded-full w-fit mx-auto mb-4">
                    <Bot className="h-8 w-8 text-tcc-orange" />
                  </div>
                  <p className="font-bold text-gray-800 dark:text-gray-200 mb-2">Welcome to Turkey Creek Cycles!</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ask me about our custom builds, services, or anything motorcycle-related.</p>
                </motion.div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isUser ? 'bg-tcc-orange' : 'bg-gray-200 dark:bg-gray-600'
                    }`}>
                      {message.isUser ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-tcc-orange" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-2xl shadow-sm ${
                        message.isUser
                          ? 'bg-tcc-orange text-white rounded-br-md'
                          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-2 ${
                        message.isUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                      <Bot className="h-4 w-4 text-tcc-orange" />
                    </div>
                    <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-2xl rounded-bl-md border border-gray-200 dark:border-gray-600 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-tcc-orange rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-tcc-orange rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-tcc-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-steel bg-white dark:bg-tcc-black">
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-3 flex items-center space-x-2 text-gray-500 dark:text-gray-400"
                >
                  <div className="flex space-x-1">
                    <motion.div
                      className="w-2 h-2 bg-tcc-orange rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-tcc-orange rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-tcc-orange rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                  <span className="text-sm">Assistant is thinking...</span>
                </motion.div>
              )}
              <div className="flex space-x-2">
                <Input
                  id="chat-input"
                  name="chatMessage"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about services, schedule an appointment..."
                  autoComplete="off"
                  className="flex-1 bg-gray-50 dark:bg-steel border-gray-200 dark:border-steel text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-tcc-orange dark:focus:border-tcc-orange rounded-xl"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-tcc-orange hover:bg-tcc-orange-bright text-white font-medium rounded-xl px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}