import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import RegisterLogin from "./Register";
import Employees from "./Employees";
import AddEmployees from "./Add_Employees";
import AddDepartment from "./AddDepartment";
import Departments from "./Departments";
import Salary from "./Salary";
import ViewSalaries from "./view_salaries";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PayrollReport from "./PayRollReport";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<RegisterLogin />} />
        <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
        <Route path="/add-employee" element={<ProtectedRoute><AddEmployees /></ProtectedRoute>} />
        <Route path="/add-department" element={<ProtectedRoute><AddDepartment /></ProtectedRoute>} />
        <Route path="/departments" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
        <Route path="/salary" element={<ProtectedRoute><Salary /></ProtectedRoute>} />
        <Route path="/view-salaries" element={<ProtectedRoute><ViewSalaries /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/payroll-report" element={<ProtectedRoute><PayrollReport /></ProtectedRoute>} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default AppContent;