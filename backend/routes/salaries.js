const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE salary
router.post('/', (req, res) => {
  const { EmployeeNumber, Month, GrossSalary, TotalDeduction, NetSalary } = req.body;
  if (
    !EmployeeNumber ||
    !Month ||
    GrossSalary === undefined ||
    TotalDeduction === undefined ||
    NetSalary === undefined
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const sql = 'INSERT INTO salary (EmployeeNumber, Month, GrossSalary, TotalDeduction, NetSalary) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [EmployeeNumber, Month, GrossSalary, TotalDeduction, NetSalary], (err, result) => {
    if (err) {
      console.error("Error adding salary:", err.sqlMessage || err);
      return res.status(500).json({ error: err.sqlMessage || err });
    }
    res.json({ message: 'Salary added!' });
  });
});

// VIEW all salaries
router.get('/', (req, res) => {
  db.query('SELECT * FROM salary', (err, results) => {
    if (err) return res.status(500).json({ error: err.sqlMessage || err });
    res.json(results);
  });
});

// UPDATE salary by EmployeeNumber
router.put('/:EmployeeNumber', (req, res) => {
  const { EmployeeNumber } = req.params;
  const { Month, GrossSalary, TotalDeduction, NetSalary } = req.body;
  const sql = 'UPDATE salary SET Month=?, GrossSalary=?, TotalDeduction=?, NetSalary=? WHERE EmployeeNumber=?';
  db.query(sql, [Month, GrossSalary, TotalDeduction, NetSalary, EmployeeNumber], (err, result) => {
    if (err) {
      console.error("Error updating salary:", err.sqlMessage || err);
      return res.status(500).json({ error: err.sqlMessage || err });
    }
    res.json({ message: 'Salary updated!' });
  });
});

// DELETE salary by EmployeeNumber
router.delete('/:EmployeeNumber', (req, res) => {
  const { EmployeeNumber } = req.params;
  db.query('DELETE FROM salary WHERE EmployeeNumber=?', [EmployeeNumber], (err, result) => {
    if (err) {
      console.error("Error deleting salary:", err.sqlMessage || err);
      return res.status(500).json({ error: err.sqlMessage || err });
    }
    res.json({ message: 'Salary deleted!' });
  });
});

module.exports = router;