import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  database: process.env.DB_SCHEMA,
  password: process.env.DB_PASSWORD,
});

export default connection;
