-- Kalkux API — D1 schema
-- Each store has one config, one theme, and many products.

CREATE TABLE IF NOT EXISTS stores (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS configs (
  store_id TEXT PRIMARY KEY REFERENCES stores(id),
  data TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS themes (
  store_id TEXT PRIMARY KEY REFERENCES stores(id),
  data TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS products (
  store_id TEXT PRIMARY KEY REFERENCES stores(id),
  data TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);
