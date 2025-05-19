const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');



// Parse JSON bodies
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3001', // your frontend port
  credentials: true
}));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'lax', // or 'none' if using HTTPS
    secure: false    // true if using HTTPS
  }
}));

const payrollRoutes = require('./routes/payroll');
app.use('/api/payroll', payrollRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const departmentRoutes = require('./routes/departments');
app.use('/api/departments', departmentRoutes);

const employeeRoutes = require('./routes/employees');
app.use('/api/employees', employeeRoutes);

const salaryRoutes = require('./routes/salaries');
app.use('/api/salaries', salaryRoutes);


app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});