// backend/src/db.js
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL Database!");
  }
});

// Auto-reconnect when connection drops
db.on('error', (err) => {
  console.error('⚠️ Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
    console.log('🔄 Attempting to reconnect...');
    db.connect((reconnectErr) => {
      if (reconnectErr) {
        console.error('❌ Reconnection failed:', reconnectErr.message);
      } else {
        console.log('✅ Reconnected to database');
      }
    });
  }
});

export default db;