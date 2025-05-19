const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/payroll/:month
router.get('/:month', (req, res) => {
  const { month } = req.params;
  const sql = `
    SELECT 
      e.FirstName, 
      e.LastName, 
      e.Position, 
      d.DepartmentName, 
      s.NetSalary
    FROM salary s
    JOIN employee e ON s.EmployeeNumber = e.EmployeeNumber
    JOIN department d ON e.DepartementCode = d.DepartementCode
    WHERE s.Month = ?
  `;

  db.query(sql, [month], (err, results) => {
    if (err) {
      console.error("Error fetching payroll:", err.sqlMessage || err);
      return res.status(500).json({ error: err.sqlMessage || err });
    }
    res.json(results);
  });
});

module.exports = router;