// src/lib/db.ts
import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(process.cwd(), "db.sqlite"));

// ユーザーテーブル
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`
).run();

// 初期ユーザー（学習用）
const exists = db.prepare("SELECT * FROM users WHERE username = ?").get("test");

if (!exists) {
  db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(
    "test",
    "00000"
  );
}

export default db;
