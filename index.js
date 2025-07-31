var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  appointments: () => appointments,
  chatSessions: () => chatSessions,
  contactSubmissions: () => contactSubmissions,
  insertAppointmentSchema: () => insertAppointmentSchema,
  insertChatSessionSchema: () => insertChatSessionSchema,
  insertContactSchema: () => insertContactSchema,
  insertUserSchema: () => insertUserSchema,
  users: () => users
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, date, time } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  newsletter: boolean("newsletter").default(false),
  submittedAt: timestamp("submitted_at").defaultNow()
});
var appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  serviceType: text("service_type").notNull(),
  appointmentDate: date("appointment_date").notNull(),
  appointmentTime: time("appointment_time").notNull(),
  description: text("description"),
  status: text("status").default("pending").notNull(),
  // pending, confirmed, cancelled, completed
  isEmergency: boolean("is_emergency").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var chatSessions = pgTable("chat_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").unique().notNull(),
  messages: text("messages").notNull(),
  // JSON string of messages
  customerEmail: text("customer_email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true
});
var insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// server/db.ts
neonConfig.webSocketConstructor = ws;
var pool = null;
var db = null;
if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema: schema_exports });
  console.log("\u{1F5C4}\uFE0F  Database connected successfully");
} else {
  console.warn("\u26A0\uFE0F  No DATABASE_URL found - running without database connection");
}

// server/storage.ts
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
var DatabaseStorage = class {
  async getUser(id) {
    if (!db) throw new Error("Database not available");
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    if (!db) throw new Error("Database not available");
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    if (!db) throw new Error("Database not available");
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async createContactSubmission(contact) {
    if (!db) throw new Error("Database not available");
    const [submission] = await db.insert(contactSubmissions).values(contact).returning();
    return submission;
  }
  async getContactSubmissions() {
    if (!db) throw new Error("Database not available");
    return await db.select().from(contactSubmissions);
  }
  async getAppointments() {
    if (!db) throw new Error("Database not available");
    return await db.select().from(appointments);
  }
  async createAppointment(appointment) {
    if (!db) throw new Error("Database not available");
    const [newAppointment] = await db.insert(appointments).values(appointment).returning();
    return newAppointment;
  }
  async getAppointmentsByDate(date2) {
    if (!db) throw new Error("Database not available");
    return await db.select().from(appointments).where(eq(appointments.appointmentDate, date2));
  }
  async updateAppointmentStatus(id, status) {
    if (!db) throw new Error("Database not available");
    const [updated] = await db.update(appointments).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where(eq(appointments.id, id)).returning();
    return updated;
  }
  async createChatSession(session) {
    if (!db) throw new Error("Database not available");
    const [newSession] = await db.insert(chatSessions).values(session).returning();
    return newSession;
  }
  async updateChatSession(sessionId, messages) {
    if (!db) throw new Error("Database not available");
    const [updated] = await db.update(chatSessions).set({ messages, updatedAt: /* @__PURE__ */ new Date() }).where(eq(chatSessions.sessionId, sessionId)).returning();
    return updated;
  }
  async getChatSession(sessionId) {
    if (!db) throw new Error("Database not available");
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.sessionId, sessionId));
    return session;
  }
};
var MemoryStorage = class {
  users = [];
  contacts = [];
  appointments = [];
  chatSessions = [];
  async getUser(id) {
    return this.users.find((u) => u.id === id);
  }
  async getUserByUsername(username) {
    return this.users.find((u) => u.username === username);
  }
  async createUser(insertUser) {
    const user = {
      id: nanoid(),
      ...insertUser
    };
    this.users.push(user);
    return user;
  }
  async createContactSubmission(contact) {
    const submission = {
      id: nanoid(),
      submittedAt: /* @__PURE__ */ new Date(),
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone || null,
      subject: contact.subject,
      message: contact.message,
      newsletter: contact.newsletter || null
    };
    this.contacts.push(submission);
    return submission;
  }
  async getContactSubmissions() {
    return [...this.contacts];
  }
  async getAppointments() {
    return [...this.appointments];
  }
  async createAppointment(appointment) {
    const newAppointment = {
      id: nanoid(),
      status: "pending",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      description: appointment.description || null,
      isEmergency: appointment.isEmergency || null,
      ...appointment
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }
  async getAppointmentsByDate(date2) {
    return this.appointments.filter((apt) => apt.appointmentDate === date2);
  }
  async updateAppointmentStatus(id, status) {
    const index = this.appointments.findIndex((apt) => apt.id === id);
    if (index === -1) return void 0;
    this.appointments[index] = {
      ...this.appointments[index],
      status,
      updatedAt: /* @__PURE__ */ new Date()
    };
    return this.appointments[index];
  }
  async createChatSession(session) {
    const newSession = {
      id: nanoid(),
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      customerEmail: session.customerEmail || null,
      ...session
    };
    this.chatSessions.push(newSession);
    return newSession;
  }
  async updateChatSession(sessionId, messages) {
    const index = this.chatSessions.findIndex((session) => session.sessionId === sessionId);
    if (index === -1) return void 0;
    this.chatSessions[index] = {
      ...this.chatSessions[index],
      messages,
      updatedAt: /* @__PURE__ */ new Date()
    };
    return this.chatSessions[index];
  }
  async getChatSession(sessionId) {
    return this.chatSessions.find((session) => session.sessionId === sessionId);
  }
};
var storage = db ? new DatabaseStorage() : new MemoryStorage();

// server/routes.ts
import { z } from "zod";
var chatRequestSchema = z.object({
  message: z.string().min(1),
  context: z.string().optional(),
  sessionId: z.string().optional()
});
function getOfflineResponse(message) {
  if (message.includes("appointment") || message.includes("schedule") || message.includes("book") || message.includes("visit") || message.includes("come in") || message.includes("bring my bike")) {
    return `I'd be happy to help you schedule an appointment! Here's what I need:

\u{1F4CB} **Appointment Information:**
\u2022 Your name
\u2022 Phone number  
\u2022 Email address
\u2022 Type of service needed
\u2022 Preferred date and time
\u2022 Brief description of the work

\u{1F4CD} **Turkey Creek Cycles**
\u2022 Location: 20476 147th St, Basehor, KS 66007
\u2022 Phone: (913) 724-3704
\u2022 Hours: Tuesday-Friday 8AM-5PM

Please provide these details and I'll get you scheduled, or call us directly at (913) 724-3704.`;
  }
  if (message.includes("hours") || message.includes("open") || message.includes("closed") || message.includes("location") || message.includes("address") || message.includes("where")) {
    return `\u{1F4CD} **Turkey Creek Cycles Location & Hours:**

**Address:** 20476 147th St, Basehor, KS 66007
**Phone:** (913) 724-3704
**Hours:** Tuesday-Friday 8AM-5PM
**Closed:** Weekends and Mondays

We're located in Basehor, Kansas, serving the Kansas City metro area. Call ahead to make sure we're available for your specific needs!`;
  }
  if (message.includes("service") || message.includes("repair") || message.includes("build") || message.includes("custom") || message.includes("fabrication") || message.includes("v-twin")) {
    return `\u{1F527} **Turkey Creek Cycles Services:**

**Custom Fabrication**
\u2022 Full custom motorcycle builds from concept to completion
\u2022 Custom baggers and touring bikes

**V-Twin Performance**  
\u2022 Engine rebuilds and performance upgrades
\u2022 Harley-Davidson and Indian motorcycle specialists
\u2022 Vintage restorations

**Service & Repair**
\u2022 Maintenance and diagnostics
\u2022 Performance modifications
\u2022 Parts and accessories

**Electric Vehicles**
\u2022 EV conversions and electric motorcycle builds

**Consultation**
\u2022 Technical advice and project planning
\u2022 Expert guidance on custom builds

For detailed pricing and specific services, call (913) 724-3704 or visit our shop!`;
  }
  if (message.includes("price") || message.includes("cost") || message.includes("estimate") || message.includes("quote") || message.includes("how much")) {
    return `\u{1F4B0} **Pricing Information:**

Custom motorcycle builds and services vary greatly based on:
\u2022 Scope of work required
\u2022 Parts and materials needed  
\u2022 Time and complexity involved
\u2022 Your specific goals and budget

**Best way to get accurate pricing:**
\u{1F4DE} Call us at (913) 724-3704
\u{1F3EA} Visit us at 20476 147th St, Basehor, KS 66007
\u{1F4C5} Schedule a consultation

We'll discuss your project in detail and provide a comprehensive estimate tailored to your needs.`;
  }
  if (message.includes("engine") || message.includes("performance") || message.includes("modification") || message.includes("upgrade") || message.includes("problem") || message.includes("issue")) {
    return `\u{1F527} **V-Twin Technical Support:**

I can provide general guidance, but for specific technical issues, our experts at Turkey Creek Cycles can give you the most accurate diagnosis and solutions.

**Common V-Twin Services:**
\u2022 Engine rebuilds and performance upgrades
\u2022 Diagnostic and troubleshooting
\u2022 Performance modifications
\u2022 Maintenance and tune-ups

**For detailed technical assistance:**
\u{1F4DE} Call (913) 724-3704 to speak with our V-Twin specialists
\u{1F4C5} Schedule a consultation for comprehensive diagnosis
\u{1F3EA} Bring your bike to 20476 147th St, Basehor, KS 66007

What specific issue or upgrade are you considering?`;
  }
  if (message.includes("emergency") || message.includes("urgent") || message.includes("broken down") || message.includes("help") || message.includes("stuck")) {
    return `\u{1F6A8} **Emergency Assistance:**

For urgent motorcycle issues:

\u{1F4DE} **Call immediately: (913) 724-3704**
\u{1F4CD} **Location:** 20476 147th St, Basehor, KS 66007

**Our hours:** Tuesday-Friday 8AM-5PM

If we're closed and you need immediate roadside assistance, consider:
\u2022 Local towing services
\u2022 AAA motorcycle coverage
\u2022 Emergency roadside assistance

Describe your situation and we'll do our best to help or recommend the right solution!`;
  }
  return `\u{1F44B} **Welcome to Turkey Creek Cycles!**

I'm here to help with:
\u2022 \u{1F4C5} Scheduling appointments
\u2022 \u{1F3EA} Shop hours and location info  
\u2022 \u{1F527} General service information
\u2022 \u26A1 V-Twin motorcycle questions
\u2022 \u{1F4B0} Pricing and consultation requests

**Turkey Creek Cycles**
\u{1F4CD} 20476 147th St, Basehor, KS 66007
\u{1F4DE} (913) 724-3704
\u{1F550} Tuesday-Friday 8AM-5PM

What can I help you with today?`;
}
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
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
  app2.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/appointments", async (req, res) => {
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
  app2.get("/api/appointments", async (req, res) => {
    try {
      const { date: date2 } = req.query;
      let appointments2;
      if (date2 && typeof date2 === "string") {
        appointments2 = await storage.getAppointmentsByDate(date2);
      } else {
        appointments2 = await storage.getAppointments();
      }
      res.json(appointments2);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.patch("/api/appointments/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!status || typeof status !== "string") {
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
  app2.post("/api/chat", async (req, res) => {
    try {
      const { message, context, sessionId } = chatRequestSchema.parse(req.body);
      const openaiKey = process.env.OPENAI_API_KEY;
      const anthropicKey = process.env.ANTHROPIC_API_KEY;
      const geminiKey = process.env.GEMINI_API_KEY;
      const perplexityKey = process.env.PERPLEXITY_API_KEY;
      if (!openaiKey && !anthropicKey && !geminiKey && !perplexityKey) {
        const offlineResponse = getOfflineResponse(message.toLowerCase());
        if (sessionId) {
          try {
            let session = await storage.getChatSession(sessionId);
            if (!session) {
              session = await storage.createChatSession({
                sessionId,
                messages: JSON.stringify([]),
                customerEmail: null
              });
            }
            const messages = JSON.parse(session.messages);
            messages.push({ role: "user", content: message, timestamp: /* @__PURE__ */ new Date() });
            messages.push({ role: "assistant", content: offlineResponse, timestamp: /* @__PURE__ */ new Date() });
            await storage.updateChatSession(sessionId, JSON.stringify(messages));
          } catch (sessionError) {
            console.error("Chat session update error:", sessionError);
          }
        }
        return res.json({ response: offlineResponse });
      }
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
              messages: [{ role: "user", content: `${systemPrompt}

User message: ${message}` }]
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
                  text: `${systemPrompt}

User message: ${message}`
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
      if (!botResponse) {
        botResponse = "I'm having trouble connecting to my AI service right now. Please contact Turkey Creek Cycles directly at (913) 724-3704 for immediate assistance, or try again in a moment.";
      }
      if (sessionId) {
        try {
          const session = await storage.getChatSession(sessionId);
          if (session) {
            const messages = JSON.parse(session.messages);
            messages.push({ role: "user", content: message, timestamp: /* @__PURE__ */ new Date() });
            messages.push({ role: "assistant", content: botResponse, timestamp: /* @__PURE__ */ new Date() });
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
  app2.post("/api/chat/sessions", async (req, res) => {
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
  app2.get("/api/chat/sessions/:sessionId", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid as nanoid2 } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid2()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  const isLocal = !process.env.DATABASE_URL && process.env.NODE_ENV === "development";
  const host = isLocal ? "localhost" : "0.0.0.0";
  server.listen({
    port,
    host,
    reusePort: !isLocal
    // Disable reusePort for local development
  }, () => {
    log(`serving on ${host}:${port}`);
  });
})();
