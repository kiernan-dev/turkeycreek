import type { 
  User, InsertUser, ContactSubmission, InsertContact,
  Appointment, InsertAppointment, ChatSession, InsertChatSession
} from "@shared/schema";
import { db } from "./db";
import { users, contactSubmissions, appointments, chatSessions } from "@shared/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Appointment methods
  getAppointments(): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointmentsByDate(date: string): Promise<Appointment[]>;
  updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined>;
  
  // Chat session methods
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  updateChatSession(sessionId: string, messages: string): Promise<ChatSession | undefined>;
  getChatSession(sessionId: string): Promise<ChatSession | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    if (!db) throw new Error('Database not available');
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) throw new Error('Database not available');
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error('Database not available');
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    if (!db) throw new Error('Database not available');
    const [submission] = await db
      .insert(contactSubmissions)
      .values(contact)
      .returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(contactSubmissions);
  }

  async getAppointments(): Promise<Appointment[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(appointments);
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    if (!db) throw new Error('Database not available');
    const [newAppointment] = await db
      .insert(appointments)
      .values(appointment)
      .returning();
    return newAppointment;
  }

  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    if (!db) throw new Error('Database not available');
    return await db
      .select()
      .from(appointments)
      .where(eq(appointments.appointmentDate, date));
  }

  async updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(appointments)
      .set({ status, updatedAt: new Date() })
      .where(eq(appointments.id, id))
      .returning();
    return updated;
  }

  async createChatSession(session: InsertChatSession): Promise<ChatSession> {
    if (!db) throw new Error('Database not available');
    const [newSession] = await db
      .insert(chatSessions)
      .values(session)
      .returning();
    return newSession;
  }

  async updateChatSession(sessionId: string, messages: string): Promise<ChatSession | undefined> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(chatSessions)
      .set({ messages, updatedAt: new Date() })
      .where(eq(chatSessions.sessionId, sessionId))
      .returning();
    return updated;
  }

  async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
    if (!db) throw new Error('Database not available');
    const [session] = await db
      .select()
      .from(chatSessions)
      .where(eq(chatSessions.sessionId, sessionId));
    return session;
  }
}

// In-memory storage for local development when no database is available
export class MemoryStorage implements IStorage {
  private users: User[] = [];
  private contacts: ContactSubmission[] = [];
  private appointments: Appointment[] = [];
  private chatSessions: ChatSession[] = [];

  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: nanoid(),
      ...insertUser
    };
    this.users.push(user);
    return user;
  }

  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    const submission: ContactSubmission = {
      id: nanoid(),
      submittedAt: new Date(),
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

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return [...this.contacts];
  }

  async getAppointments(): Promise<Appointment[]> {
    return [...this.appointments];
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const newAppointment: Appointment = {
      id: nanoid(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      description: appointment.description || null,
      isEmergency: appointment.isEmergency || null,
      ...appointment
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }

  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    return this.appointments.filter(apt => apt.appointmentDate === date);
  }

  async updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined> {
    const index = this.appointments.findIndex(apt => apt.id === id);
    if (index === -1) return undefined;
    
    this.appointments[index] = {
      ...this.appointments[index],
      status,
      updatedAt: new Date()
    };
    return this.appointments[index];
  }

  async createChatSession(session: InsertChatSession): Promise<ChatSession> {
    const newSession: ChatSession = {
      id: nanoid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      customerEmail: session.customerEmail || null,
      ...session
    };
    this.chatSessions.push(newSession);
    return newSession;
  }

  async updateChatSession(sessionId: string, messages: string): Promise<ChatSession | undefined> {
    const index = this.chatSessions.findIndex(session => session.sessionId === sessionId);
    if (index === -1) return undefined;
    
    this.chatSessions[index] = {
      ...this.chatSessions[index],
      messages,
      updatedAt: new Date()
    };
    return this.chatSessions[index];
  }

  async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
    return this.chatSessions.find(session => session.sessionId === sessionId);
  }
}

// Use database storage if available, otherwise fallback to memory storage
export const storage = db ? new DatabaseStorage() : new MemoryStorage();
