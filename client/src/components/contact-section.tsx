import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Clock, MapPin, Send, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  newsletter: boolean;
}

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    newsletter: false,
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent!",
        description: data.message,
      });
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        newsletter: false,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const businessHours = [
    { day: "Monday", hours: "Closed", isOpen: false },
    { day: "Tuesday - Friday", hours: "8:00 AM - 5:00 PM", isOpen: true },
    { day: "Saturday", hours: "Closed", isOpen: false },
    { day: "Sunday", hours: "Closed", isOpen: false },
  ];

  return (
    <section id="contact" className="py-24 bg-tcc-dark-gray relative overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6600' fill-opacity='0.06'%3E%3Cpath d='M50 50L0 0h100L50 50zM0 100h100L50 50z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-16 bg-tcc-orange mr-4"></div>
            <Mail className="h-8 w-8 text-tcc-orange" />
            <div className="h-1 w-16 bg-tcc-orange ml-4"></div>
          </div>
          
          <h2 className="font-oswald text-5xl md:text-6xl text-white mb-2 tracking-wider">
            GET IN <span className="text-tcc-orange">TOUCH</span>
          </h2>
          
          <div 
            className="bg-tcc-orange text-tcc-black px-6 py-3 mx-auto w-fit mb-6 relative"
            style={{
              clipPath: 'polygon(20px 0%, calc(100% - 20px) 0%, 100% 100%, 0% 100%)'
            }}
          >
            <p className="font-oswald text-lg font-bold tracking-widest">24 HOUR RESPONSE</p>
            <div className="absolute inset-0 metallic-gradient opacity-30"></div>
          </div>
          
          <p className="text-xl text-gray-300 font-inter">Ready to start your custom build or need service?</p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div 
            className="bg-tcc-black border-2 border-steel p-8 relative overflow-hidden"
            style={{
              clipPath: 'polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)'
            }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div 
              className="bg-tcc-orange text-tcc-black px-6 py-3 mb-6 w-fit relative"
              style={{
                clipPath: 'polygon(0% 0%, calc(100% - 15px) 0%, 100% 100%, 15px 100%)'
              }}
            >
              <h3 className="font-oswald text-xl font-bold tracking-widest">SEND MESSAGE</h3>
              <div className="absolute inset-0 metallic-gradient opacity-30"></div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-inter font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="John"
                    autoComplete="given-name"
                    className="bg-gray-800 border-steel focus:border-tcc-orange text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-inter font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Doe"
                    autoComplete="family-name"
                    className="bg-gray-800 border-steel focus:border-tcc-orange text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-inter font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="john@example.com"
                  autoComplete="email"
                  className="bg-gray-800 border-steel focus:border-tcc-orange text-white placeholder-gray-400"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-inter font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(913) 555-0123"
                  autoComplete="tel"
                  className="bg-gray-800 border-steel focus:border-tcc-orange text-white placeholder-gray-400"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-inter font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)} name="subject">
                  <SelectTrigger id="subject" name="subject" className="bg-gray-800 border-steel focus:border-tcc-orange text-white">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom-build">Custom Build</SelectItem>
                    <SelectItem value="service-repair">Service & Repair</SelectItem>
                    <SelectItem value="performance">Performance Upgrade</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="parts">Parts & Accessories</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-inter font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={6}
                  placeholder="Tell us about your project or what you need help with..."
                  className="bg-gray-800 border-steel focus:border-tcc-orange text-white placeholder-gray-400"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => handleInputChange("newsletter", checked === true)}
                  className="border-steel data-[state=checked]:bg-tcc-orange data-[state=checked]:border-tcc-orange"
                />
                <label htmlFor="newsletter" className="text-sm font-inter text-gray-300">
                  I agree to receive email updates and promotional content from Turkey Creek Cycles.
                </label>
              </div>
              
              <div 
                className="bg-tcc-orange hover:bg-tcc-orange-bright text-tcc-black py-4 px-6 font-oswald font-bold text-lg tracking-widest transition-all duration-300 inline-flex items-center justify-center cursor-pointer relative group w-full"
                style={{
                  clipPath: 'polygon(15px 0%, calc(100% - 15px) 0%, 100% 100%, 0% 100%)'
                }}
                onClick={handleSubmit}
              >
                {contactMutation.isPending ? "SENDING..." : "SEND MESSAGE"}
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 metallic-gradient opacity-30"></div>
              </div>
              
              <p className="text-sm text-gray-400 text-center font-inter">
                We typically respond within 24 hours during business hours.
              </p>
            </form>
            
            <div className="absolute inset-0 metallic-gradient opacity-0 hover:opacity-5 transition-opacity pointer-events-none"></div>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Business Hours */}
            <div 
              className="bg-tcc-black border-2 border-steel p-8 relative overflow-hidden"
              style={{
                clipPath: 'polygon(0% 0%, calc(100% - 20px) 0%, 100% 100%, 20px 100%)'
              }}
            >
              <div 
                className="bg-tcc-orange text-tcc-black px-4 py-2 mb-6 w-fit relative flex items-center"
                style={{
                  clipPath: 'polygon(0% 0%, calc(100% - 12px) 0%, 100% 100%, 12px 100%)'
                }}
              >
                <Clock className="h-5 w-5 mr-2" />
                <h3 className="font-oswald text-lg font-bold tracking-widest">BUSINESS HOURS</h3>
                <div className="absolute inset-0 metallic-gradient opacity-30"></div>
              </div>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-300 font-inter">{schedule.day}</span>
                    <span className={`${schedule.isOpen ? "text-tcc-orange" : "text-gray-500"} font-oswald font-semibold`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 metallic-gradient opacity-0 hover:opacity-5 transition-opacity"></div>
            </div>
            
            {/* Contact Details */}
            <div 
              className="bg-tcc-black border-2 border-steel p-8 relative overflow-hidden"
              style={{
                clipPath: 'polygon(0% 0%, calc(100% - 20px) 0%, 100% 100%, 20px 100%)'
              }}
            >
              <div 
                className="bg-tcc-orange text-tcc-black px-4 py-2 mb-6 w-fit relative flex items-center"
                style={{
                  clipPath: 'polygon(0% 0%, calc(100% - 12px) 0%, 100% 100%, 12px 100%)'
                }}
              >
                <MapPin className="h-5 w-5 mr-2" />
                <h3 className="font-oswald text-lg font-bold tracking-widest">CONTACT INFO</h3>
                <div className="absolute inset-0 metallic-gradient opacity-30"></div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-gray-300 font-inter font-medium mb-1">Address</h4>
                  <p className="text-white font-inter">20476 147th St<br />Basehor, KS 66007</p>
                </div>
                <div>
                  <h4 className="text-gray-300 font-inter font-medium mb-1">Phone</h4>
                  <a href="tel:9134324041" className="text-tcc-orange hover:text-tcc-orange/80 transition-colors">
                    (913) 432-4041
                  </a>
                </div>
                <div>
                  <h4 className="text-gray-300 font-inter font-medium mb-1">Email</h4>
                  <a href="mailto:info@turkeycreekcycles.com" className="text-tcc-orange hover:text-tcc-orange/80 transition-colors">
                    info@turkeycreekcycles.com
                  </a>
                </div>
              </div>
              <div className="absolute inset-0 metallic-gradient opacity-0 hover:opacity-5 transition-opacity"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
