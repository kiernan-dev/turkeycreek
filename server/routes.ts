import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertAppointmentSchema, insertChatSessionSchema } from "@shared/schema";
import { z } from "zod";

const chatRequestSchema = z.object({
  message: z.string().min(1),
  context: z.string().optional(),
  sessionId: z.string().optional()
});

function getOfflineResponse(message: string): string {
  // Appointment scheduling keywords
  if (message.includes('appointment') || message.includes('schedule') || message.includes('book') || 
      message.includes('visit') || message.includes('come in') || message.includes('bring my bike')) {
    return `I'd be happy to help you schedule an appointment! Here's what I need:

📋 **Appointment Information:**
• Your name
• Phone number  
• Email address
• Type of service needed
• Preferred date and time
• Brief description of the work

📍 **Turkey Creek Cycles**
• Location: 20476 147th St, Basehor, KS 66007
• Phone: (913) 724-3704
• Hours: Tuesday-Friday 8AM-5PM

Please provide these details and I'll get you scheduled, or call us directly at (913) 724-3704.`;
  }

  // Hours and location
  if (message.includes('hours') || message.includes('open') || message.includes('closed') || 
      message.includes('location') || message.includes('address') || message.includes('where')) {
    return `📍 **Turkey Creek Cycles Location & Hours:**

**Address:** 20476 147th St, Basehor, KS 66007
**Phone:** (913) 724-3704
**Hours:** Tuesday-Friday 8AM-5PM
**Closed:** Weekends and Mondays

We're located in Basehor, Kansas, serving the Kansas City metro area. Call ahead to make sure we're available for your specific needs!`;
  }

  // Services information
  if (message.includes('service') || message.includes('repair') || message.includes('build') || 
      message.includes('custom') || message.includes('fabrication') || message.includes('v-twin')) {
    return `🔧 **Turkey Creek Cycles Services:**

**Custom Fabrication**
• Full custom motorcycle builds from concept to completion
• Custom baggers and touring bikes

**V-Twin Performance**  
• Engine rebuilds and performance upgrades
• Harley-Davidson and Indian motorcycle specialists
• Vintage restorations

**Service & Repair**
• Maintenance and diagnostics
• Performance modifications
• Parts and accessories

**Electric Vehicles**
• EV conversions and electric motorcycle builds

**Consultation**
• Technical advice and project planning
• Expert guidance on custom builds

For detailed pricing and specific services, call (913) 724-3704 or visit our shop!`;
  }

  // Pricing questions
  if (message.includes('price') || message.includes('cost') || message.includes('estimate') || 
      message.includes('quote') || message.includes('how much')) {
    return `💰 **Pricing Information:**

Custom motorcycle builds and services vary greatly based on:
• Scope of work required
• Parts and materials needed  
• Time and complexity involved
• Your specific goals and budget

**Best way to get accurate pricing:**
📞 Call us at (913) 724-3704
🏪 Visit us at 20476 147th St, Basehor, KS 66007
📅 Schedule a consultation

We'll discuss your project in detail and provide a comprehensive estimate tailored to your needs.`;
  }

  // Technical V-Twin questions
  if (message.includes('engine') || message.includes('performance') || message.includes('modification') || 
      message.includes('upgrade') || message.includes('problem') || message.includes('issue')) {
    return `🔧 **V-Twin Technical Support:**

I can provide general guidance, but for specific technical issues, our experts at Turkey Creek Cycles can give you the most accurate diagnosis and solutions.

**Common V-Twin Services:**
• Engine rebuilds and performance upgrades
• Diagnostic and troubleshooting
• Performance modifications
• Maintenance and tune-ups

**For detailed technical assistance:**
📞 Call (913) 724-3704 to speak with our V-Twin specialists
📅 Schedule a consultation for comprehensive diagnosis
🏪 Bring your bike to 20476 147th St, Basehor, KS 66007

What specific issue or upgrade are you considering?`;
  }

  // Emergency or urgent
  if (message.includes('emergency') || message.includes('urgent') || message.includes('broken down') || 
      message.includes('help') || message.includes('stuck')) {
    return `🚨 **Emergency Assistance:**

For urgent motorcycle issues:

📞 **Call immediately: (913) 724-3704**
📍 **Location:** 20476 147th St, Basehor, KS 66007

**Our hours:** Tuesday-Friday 8AM-5PM

If we're closed and you need immediate roadside assistance, consider:
• Local towing services
• AAA motorcycle coverage
• Emergency roadside assistance

Describe your situation and we'll do our best to help or recommend the right solution!`;
  }

  // General greeting or default
  return `👋 **Welcome to Turkey Creek Cycles!**

I'm here to help with:
• 📅 Scheduling appointments
• 🏪 Shop hours and location info  
• 🔧 General service information
• ⚡ V-Twin motorcycle questions
• 💰 Pricing and consultation requests

**Turkey Creek Cycles**
📍 20476 147th St, Basehor, KS 66007
📞 (913) 724-3704
🕐 Tuesday-Friday 8AM-5PM

What can I help you with today?`;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContactSubmission(validatedData);
      
      res.json({ 
        success: true, 
        message: "Your message has been sent successfully! We'll respond within 24 hours." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please check your form data and try again.",
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while sending your message. Please try again." 
        });
      }
    }
  });

  // Get contact submissions (for admin use)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Appointment routes
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      
      console.log("New appointment scheduled:", appointment);
      
      res.json({ 
        success: true, 
        appointment,
        message: "Appointment scheduled successfully! We'll contact you to confirm." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please check your appointment details and try again.",
          errors: error.errors 
        });
      } else {
        console.error("Appointment creation error:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while scheduling your appointment. Please try again." 
        });
      }
    }
  });

  app.get("/api/appointments", async (req, res) => {
    try {
      const { date } = req.query;
      let appointments;
      
      if (date && typeof date === 'string') {
        appointments = await storage.getAppointmentsByDate(date);
      } else {
        appointments = await storage.getAppointments();
      }
      
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/appointments/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ error: "Status is required" });
      }
      
      const appointment = await storage.updateAppointmentStatus(id, status);
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      
      res.json({ success: true, appointment });
    } catch (error) {
      console.error("Update appointment status error:", error);
      res.status(500).json({ error: "Failed to update appointment status" });
    }
  });

  // Chat API with multiple AI provider support and appointment scheduling
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, context, sessionId } = chatRequestSchema.parse(req.body);
      
      // Check for available API keys in priority order
      const openaiKey = process.env.OPENAI_API_KEY;
      const anthropicKey = process.env.ANTHROPIC_API_KEY;
      const geminiKey = process.env.GEMINI_API_KEY;
      const perplexityKey = process.env.PERPLEXITY_API_KEY;

      // If no API keys available, use offline guided conversation template
      if (!openaiKey && !anthropicKey && !geminiKey && !perplexityKey) {
        const offlineResponse = getOfflineResponse(message.toLowerCase());
        
        // If sessionId provided, update the chat session
        if (sessionId) {
          try {
            let session = await storage.getChatSession(sessionId);
            if (!session) {
              // Create new session if it doesn't exist
              session = await storage.createChatSession({
                sessionId,
                messages: JSON.stringify([]),
                customerEmail: null
              });
            }
            const messages = JSON.parse(session.messages);
            messages.push({ role: 'user', content: message, timestamp: new Date() });
            messages.push({ role: 'assistant', content: offlineResponse, timestamp: new Date() });
            await storage.updateChatSession(sessionId, JSON.stringify(messages));
          } catch (sessionError) {
            console.error("Chat session update error:", sessionError);
          }
        }

        return res.json({ response: offlineResponse });
      }

      // Enhanced system prompt with appointment scheduling capabilities
      const systemPrompt = `You are a 24/7 AI assistant for Turkey Creek Cycles, a custom American V-Twin motorcycle fabrication shop in Basehor, Kansas. You can help customers with questions and schedule appointments.

Key information about Turkey Creek Cycles:
- Location: 20476 147th St, Basehor, KS 66007
- Phone: (913) 724-3704
- Hours: Tuesday-Friday 8AM-5PM, Closed weekends and Mondays
- Established: 2008
- Owner: Expert in custom American V-Twin builds

Services:
1. Custom Fabrication: Full custom motorcycle builds from concept to completion
2. V-Twin Performance: Engine rebuilds, performance upgrades, tuning
3. Service & Repair: Maintenance, diagnostics, repair work
4. Parts & Accessories: Custom and aftermarket parts sourcing
5. Consultation: Technical advice and project planning
6. Electric Vehicles: EV conversions and electric motorcycle builds

Specialties:
- American V-Twin motorcycles (Harley-Davidson, Indian, custom builds)
- Custom baggers and touring bikes
- Vintage motorcycle restorations
- Performance modifications and upgrades
- Custom paint and fabrication work

When customers ask about scheduling appointments or need service:
1. Ask for their name, phone number, and email
2. Ask what type of service they need
3. Ask for their preferred date and time
4. Ask if it's an emergency (urgent repair needed)
5. Provide available time slots during business hours
6. Confirm appointment details

For technical V-Twin questions, provide helpful information but recommend they visit for detailed diagnosis. For pricing, suggest they call or visit for accurate quotes. Keep responses conversational and helpful.

Available appointment times: Tuesday-Friday 8AM-5PM (lunch 12-1PM typically busy)`;

      let botResponse = "";

      // Try OpenAI first (most popular choice)
      if (openaiKey) {
        try {
          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${openaiKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "gpt-4o",
              messages: [
                {
                  role: "system",
                  content: systemPrompt
                },
                {
                  role: "user",
                  content: message
                }
              ],
              max_tokens: 400,
              temperature: 0.7
            })
          });

          if (response.ok) {
            const data = await response.json();
            botResponse = data.choices?.[0]?.message?.content || "";
          }
        } catch (error) {
          console.error("OpenAI API error:", error);
        }
      }

      // Fallback to Anthropic
      if (!botResponse && anthropicKey) {
        try {
          const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "x-api-key": anthropicKey,
              "Content-Type": "application/json",
              "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 400,
              messages: [{ role: 'user', content: `${systemPrompt}\n\nUser message: ${message}` }]
            })
          });

          if (response.ok) {
            const data = await response.json();
            botResponse = data.content?.[0]?.text || "";
          }
        } catch (error) {
          console.error("Anthropic API error:", error);
        }
      }

      // Fallback to Gemini
      if (!botResponse && geminiKey) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `${systemPrompt}\n\nUser message: ${message}`
                }]
              }]
            })
          });

          if (response.ok) {
            const data = await response.json();
            botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
          }
        } catch (error) {
          console.error("Gemini API error:", error);
        }
      }

      // Fallback to Perplexity
      if (!botResponse && perplexityKey) {
        try {
          const response = await fetch("https://api.perplexity.ai/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${perplexityKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "llama-3.1-sonar-small-128k-online",
              messages: [
                {
                  role: "system",
                  content: systemPrompt
                },
                {
                  role: "user",
                  content: message
                }
              ],
              max_tokens: 400,
              temperature: 0.7,
              stream: false
            })
          });

          if (response.ok) {
            const data = await response.json();
            botResponse = data.choices?.[0]?.message?.content || "";
          }
        } catch (error) {
          console.error("Perplexity API error:", error);
        }
      }

      // Final fallback response
      if (!botResponse) {
        botResponse = "I'm having trouble connecting to my AI service right now. Please contact Turkey Creek Cycles directly at (913) 724-3704 for immediate assistance, or try again in a moment.";
      }

      // If sessionId provided, update the chat session
      if (sessionId) {
        try {
          const session = await storage.getChatSession(sessionId);
          if (session) {
            const messages = JSON.parse(session.messages);
            messages.push({ role: 'user', content: message, timestamp: new Date() });
            messages.push({ role: 'assistant', content: botResponse, timestamp: new Date() });
            await storage.updateChatSession(sessionId, JSON.stringify(messages));
          }
        } catch (sessionError) {
          console.error("Chat session update error:", sessionError);
        }
      }

      res.json({ response: botResponse });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed", 
          response: "Please provide a valid message."
        });
      }
      console.error("Chat API error:", error);
      res.status(500).json({ 
        error: "Internal server error",
        response: "I'm having technical difficulties. Please contact Turkey Creek Cycles directly at (913) 724-3704."
      });
    }
  });

  // Chat session management
  app.post("/api/chat/sessions", async (req, res) => {
    try {
      const sessionData = insertChatSessionSchema.parse(req.body);
      const session = await storage.createChatSession(sessionData);
      res.json({ success: true, session });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid session data",
          errors: error.errors 
        });
      } else {
        console.error("Chat session creation error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to create chat session" 
        });
      }
    }
  });

  app.get("/api/chat/sessions/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getChatSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      
      res.json(session);
    } catch (error) {
      console.error("Get chat session error:", error);
      res.status(500).json({ error: "Failed to fetch chat session" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
