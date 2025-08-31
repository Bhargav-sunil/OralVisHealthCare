const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../data/app.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("DB connection error:", err);
  else console.log("Connected to SQLite");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('technician', 'dentist')),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS scans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patientName TEXT NOT NULL,
      patientId TEXT NOT NULL,
      scanType TEXT NOT NULL,
      region TEXT NOT NULL,
      imageUrl TEXT,
      uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
      uploadedBy INTEGER NOT NULL,
      FOREIGN KEY(uploadedBy) REFERENCES users(id)
    )
  `);
});

module.exports = db;
