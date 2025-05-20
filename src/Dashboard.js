import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const [counts, setCounts] = useState({
    employees: 0,
    departments: 0,
    salaries: 0,
  });

  useEffect(() => {
    // Fetch counts from backend endpoints
    Promise.all([
      fetch("http://localhost:3000/api/employees").then((res) => res.json()),
      fetch("http://localhost:3000/api/departments").then((res) => res.json()),
      fetch("http://localhost:3000/api/salaries").then((res) => res.json()),
    ]).then(([employees, departments, salaries]) => {
      setCounts({
        employees: employees.length,
        departments: departments.length,
        salaries: salaries.length,
      });
    });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">EPMS Dashboard</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow mb-3">
            <div className="card-body">
              <h5 className="card-title">Employees</h5>
              <p className="display-4">{counts.employees}</p>
              <Link to="/employees" className="btn btn-primary btn-sm">
                View Employees
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow mb-3">
            <div className="card-body">
              <h5 className="card-title">Departments</h5>
              <p className="display-4">{counts.departments}</p>
              <Link to="/departments" className="btn btn-primary btn-sm">
                View Departments
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow mb-3">
            <div className="card-body">
              <h5 className="card-title">Salaries</h5>
              <p className="display-4">{counts.salaries}</p>
              <Link to="/view-salaries" className="btn btn-primary btn-sm">
                View Salaries
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* You can add more dashboard widgets, charts, or recent activity here */}
    </div>
  );
}

export default Dashboard;