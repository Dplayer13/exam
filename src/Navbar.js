import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          EPMS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Logout
              </Link>
            </li>
              <li className="nav-item">
              <Link to="/employees" className="nav-link">
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/payroll-report" className="nav-link">
                pay roll report
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-employee" className="nav-link">
                Add Employee
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/departments" className="nav-link">
                Departments
              </Link>
            </li> */}
                 <li className="nav-item">
              <Link to="/add-department" className="nav-link">
                Add Department
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/salary" className="nav-link">
                Salary
              </Link>
            </li>
       
               {/* <li className="nav-item">
            <Link to="/departments" className="nav-link">
            Departments
            </Link>
             </li> */}
         <li className="nav-item">
  <Link to="/view-salaries" className="nav-link">
    viewSalaries
  </Link>
</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;