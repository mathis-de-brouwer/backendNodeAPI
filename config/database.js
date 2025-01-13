const mysql = require('mysql2/promise');
require('dotenv').config();

// connection
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// test connection
(async () => {
  try {
    const [rows] = await connection.query('SELECT 1');
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
})();

module.exports = connection;