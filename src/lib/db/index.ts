import Database from "better-sqlite3";
import path from "path";
import { SCHEMA_SQL, MIGRATIONS_V2 } from "./schema";
import { nanoid } from "nanoid";
import type { ResumeData } from "../types";

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    const dbPath = path.join(process.cwd(), "data.db");
    db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    db.exec(SCHEMA_SQL);
    // Run V2 migrations (ignore "duplicate column" errors for idempotency)
    for (const sql of MIGRATIONS_V2) {
      try { db.exec(sql); } catch { /* column already exists */ }
    }
  }
  return db;
}

// ── Users ──

export interface UserRecord {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  plan: string;
  parse_count: number;
  stripe_customer_id: string;
  subscription_expires_at: string;
  created_at: string;
}

export function createUser(email: string, passwordHash: string, name: string) {
  const id = nanoid(16);
  getDb()
    .prepare("INSERT INTO users (id, email, password_hash, name) VALUES (?, ?, ?, ?)")
    .run(id, email, passwordHash, name);
  return { id, email, name };
}

export function findUserByEmail(email: string) {
  return getDb()
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as UserRecord | undefined;
}

export function findUserById(id: string) {
  return getDb()
    .prepare("SELECT id, email, name, plan, parse_count, stripe_customer_id, subscription_expires_at, created_at FROM users WHERE id = ?")
    .get(id) as Pick<UserRecord, "id"|"email"|"name"|"plan"|"parse_count"|"stripe_customer_id"|"subscription_expires_at"|"created_at"> | undefined;
}

// ── Subscription ──

export function getUserPlan(userId: string) {
  const row = getDb()
    .prepare("SELECT plan, parse_count, subscription_expires_at FROM users WHERE id = ?")
    .get(userId) as { plan: string; parse_count: number; subscription_expires_at: string } | undefined;
  if (!row) return null;

  // Auto-downgrade expired subscriptions
  if (row.plan !== "free" && row.subscription_expires_at && row.subscription_expires_at < new Date().toISOString()) {
    getDb().prepare("UPDATE users SET plan = 'free' WHERE id = ?").run(userId);
    return { plan: "free", parseCount: row.parse_count };
  }
  return { plan: row.plan, parseCount: row.parse_count };
}

export function incrementParseCount(userId: string) {
  getDb().prepare("UPDATE users SET parse_count = parse_count + 1 WHERE id = ?").run(userId);
}

export function upgradeUserPlan(userId: string, plan: string, stripeCustomerId: string, expiresAt: string) {
  getDb()
    .prepare("UPDATE users SET plan = ?, stripe_customer_id = ?, subscription_expires_at = ?, plan_updated_at = datetime('now') WHERE id = ?")
    .run(plan, stripeCustomerId, expiresAt, userId);
}

// ── Guest tracking (cookie-based) ──

// In-memory guest count (resets on server restart; for production use Redis or similar)
const guestCounts = new Map<string, number>();
export function getGuestParseCount(guestId: string): number {
  return guestCounts.get(guestId) || 0;
}
export function incrementGuestParseCount(guestId: string): number {
  const count = (guestCounts.get(guestId) || 0) + 1;
  guestCounts.set(guestId, count);
  return count;
}

// ── Resumes ──

export function saveResume(userId: string, data: ResumeData, agentId: string, name?: string) {
  const existing = getResumeByUserId(userId);
  const id = existing?.id || nanoid(12);
  const resumeName = name || data.basics.name || "未命名简历";

  if (existing) {
    getDb()
      .prepare("UPDATE resumes SET data_json = ?, agent_id = ?, name = ?, updated_at = datetime('now') WHERE id = ?")
      .run(JSON.stringify(data), agentId, resumeName, existing.id);
    return { id: existing.id, name: resumeName };
  }

  getDb()
    .prepare("INSERT INTO resumes (id, user_id, name, data_json, agent_id) VALUES (?, ?, ?, ?, ?)")
    .run(id, userId, resumeName, JSON.stringify(data), agentId);
  return { id, name: resumeName };
}

export function getResumeByUserId(userId: string) {
  return getDb()
    .prepare("SELECT * FROM resumes WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1")
    .get(userId) as { id: string; user_id: string; name: string; data_json: string; agent_id: string; updated_at: string } | undefined;
}

export function getResumeById(resumeId: string) {
  return getDb()
    .prepare("SELECT * FROM resumes WHERE id = ?")
    .get(resumeId) as { id: string; user_id: string; name: string; data_json: string; agent_id: string; updated_at: string } | undefined;
}

export function listResumesByUser(userId: string) {
  return getDb()
    .prepare("SELECT id, name, agent_id, created_at, updated_at FROM resumes WHERE user_id = ? ORDER BY updated_at DESC")
    .all(userId) as { id: string; name: string; agent_id: string; created_at: string; updated_at: string }[];
}

export function deleteResume(resumeId: string) {
  getDb().prepare("DELETE FROM resumes WHERE id = ?").run(resumeId);
}

export function updateResumeName(resumeId: string, name: string) {
  getDb()
    .prepare("UPDATE resumes SET name = ?, updated_at = datetime('now') WHERE id = ?")
    .run(name, resumeId);
}
