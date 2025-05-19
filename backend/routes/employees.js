const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE employee
router.post('/', (req, res) => {
  const { EmployeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, HiredDate, DepartementCode } = req.body;
  const sql = 'INSERT INTO employee (EmployeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, HiredDate, DepartementCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [EmployeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, HiredDate, DepartementCode], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Employee added!' });
  });
});

// GET all employees
router.get('/', (req, res) => {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;