import Database from "better-sqlite3";
import path from "path";
import { SCHEMA_SQL } from "./schema";
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
  }
  return db;
}

// ── Users ──

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
    .get(email) as { id: string; email: string; password_hash: string; name: string } | undefined;
}

export function findUserById(id: string) {
  return getDb()
    .prepare("SELECT id, email, name, created_at FROM users WHERE id = ?")
    .get(id) as { id: string; email: string; name: string; created_at: string } | undefined;
}

// ── Resumes ──

export function saveResume(userId: string, data: ResumeData, agentId: string, name?: string) {
  const existing = getResumeByUserId(userId);
  const id = existing?.id || nanoid(12);
  const resumeName = name || data.basics.name || "未命名简历";

  if (existing) {
    getDb()
      .prepare(
        "UPDATE resumes SET data_json = ?, agent_id = ?, name = ?, updated_at = datetime('now') WHERE id = ?"
      )
      .run(JSON.stringify(data), agentId, resumeName, existing.id);
    return { id: existing.id, name: resumeName };
  }

  getDb()
    .prepare(
      "INSERT INTO resumes (id, user_id, name, data_json, agent_id) VALUES (?, ?, ?, ?, ?)"
    )
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
