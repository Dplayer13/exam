const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'epms'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

module.exports = db;
