import React, { useState } from "react";

function PayrollReport() {
  const [month, setMonth] = useState("");
  const [payroll, setPayroll] = useState([]);
  const [message, setMessage] = useState("");

  const fetchPayroll = () => {
    if (!month) {
      setMessage("Please select a month.");
      setPayroll([]);
      return;
    }
    fetch(`http://localhost:3000/api/payroll/${month}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPayroll(data);
          setMessage("");
        } else if (data && data.error) {
          setPayroll([]);
          setMessage("Error: " + data.error);
        } else {
          setPayroll([]);
          setMessage("No payroll data found.");
        }
      })
      .catch(() => {
        setPayroll([]);
        setMessage("Error fetching payroll.");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Monthly Payroll Report</h2>
      <div className="mb-3">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-primary mt-2" onClick={fetchPayroll}>
          Generate Payroll
        </button>
      </div>
      {message && <div className="alert alert-warning">{message}</div>}
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {payroll.length > 0 ? (
            payroll.map((row, idx) => (
              <tr
                key={
                  (row.EmployeeNumber || "") +
                  (row.FirstName || "") +
                  (row.LastName || "") +
                  (row.Position || "") +
                  (row.DepartmentName || "") +
                  idx
                }
              >
                <td>{row.FirstName}</td>
                <td>{row.LastName}</td>
                <td>{row.Position}</td>
                <td>{row.DepartmentName}</td>
                <td>{row.NetSalary}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No payroll data found for this month.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PayrollReport;