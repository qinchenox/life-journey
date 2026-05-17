export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS resumes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '未命名简历',
  data_json TEXT NOT NULL DEFAULT '{}',
  agent_id TEXT NOT NULL DEFAULT 'general-allround',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
`;

// V2 migration — add subscription columns
export const MIGRATIONS_V2 = [
  "ALTER TABLE users ADD COLUMN plan TEXT DEFAULT 'free'",
  "ALTER TABLE users ADD COLUMN parse_count INTEGER DEFAULT 0",
  "ALTER TABLE users ADD COLUMN stripe_customer_id TEXT DEFAULT ''",
  "ALTER TABLE users ADD COLUMN subscription_expires_at TEXT DEFAULT ''",
  "ALTER TABLE users ADD COLUMN plan_updated_at TEXT DEFAULT ''",
];
