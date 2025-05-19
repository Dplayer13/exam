const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE department
router.post('/', (req, res) => {
  const { DepartementCode, DepartementName } = req.body;
  const sql = 'INSERT INTO department (DepartementCode, DepartementName) VALUES (?, ?)';
  db.query(sql, [DepartementCode, DepartementName], (err, result) => {
    if (err) {
      console.error("Error adding department:", err);
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'Department added!' });
  });
});

// GET all departments
router.get('/', (req, res) => {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.error("Error fetching departments:", err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

module.exports = router;