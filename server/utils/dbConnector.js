const { Pool } = require("pg");

// Get access to DB
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "shopDB",
  password: "12345678",
  port: 5432,
});

module.exports = pool;
