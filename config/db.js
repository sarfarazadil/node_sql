const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
// Create connection
const db = mysql.createConnection({
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASS,
  //   database: process.env.DB_NAME,
  host: "localhost",
  user: "nodeuser",
  password: "nodepass",
  database: "school_db",
});

// Connect and query
db.connect((err) => {
  if (err) {
    console.error("atabase connection failed:", err.message);
    return;
  }
  console.log("Connected to MySQL");
});

module.exports = db;
