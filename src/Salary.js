import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Salary() {
  const [form, setForm] = useState({
    EmployeeNumber: "",
    Month: "",
    GrossSalary: "",
    TotalDeduction: "",
    NetSalary: "",
  });
  const [employees, setEmployees] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(null); // EmployeeNumber

  useEffect(() => {
    fetch("http://localhost:3000/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
    fetchSalaries();
  }, []);

  const fetchSalaries = () => {
    fetch("http://localhost:3000/api/salaries")
      .then((res) => res.json())
      .then((data) => setSalaries(data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (salary) => {
    setForm({
      EmployeeNumber: salary.EmployeeNumber,
      Month: salary.Month,
      GrossSalary: salary.GrossSalary,
      TotalDeduction: salary.TotalDeduction,
      NetSalary: salary.NetSalary,
    });
    setEditing(salary.EmployeeNumber);
  };

  const handleDelete = (EmployeeNumber) => {
    if (!EmployeeNumber) {
      setMessage("Invalid EmployeeNumber for delete.");
      return;
    }
    fetch(`http://localhost:3000/api/salaries/${EmployeeNumber}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setMessage("Salary deleted!");
        fetchSalaries();
      })
      .catch(() => setMessage("Error deleting salary."));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      if (!form.EmployeeNumber) {
        setMessage("Invalid EmployeeNumber for update.");
        return;
      }
      fetch(
        `http://localhost:3000/api/salaries/${editing}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setMessage(data.error);
          } else {
            setMessage("Salary updated!");
            setForm({
              EmployeeNumber: "",
              Month: "",
              GrossSalary: "",
              TotalDeduction: "",
              NetSalary: "",
            });
            setEditing(null);
            fetchSalaries();
          }
        })
        .catch(() => setMessage("Error updating salary."));
    } else {
      fetch("http://localhost:3000/api/salaries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setMessage(data.error);
          } else {
            setMessage("Salary added successfully!");
            setForm({
              EmployeeNumber: "",
              Month: "",
              GrossSalary: "",
              TotalDeduction: "",
              NetSalary: "",
            });
            fetchSalaries();
          }
        })
        .catch(() => setMessage("Error adding salary."));
    }
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setForm({
      EmployeeNumber: "",
      Month: "",
      GrossSalary: "",
      TotalDeduction: "",
      NetSalary: "",
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                {editing ? "Edit Salary" : "Add Salary"}
              </h2>
              {message && (
                <div className="alert alert-success text-center">{message}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <select
                    name="EmployeeNumber"
                    value={form.EmployeeNumber}
                    onChange={handleChange}
                    className="form-select"
                    required
                    disabled={!!editing}
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp.EmployeeNumber} value={emp.EmployeeNumber}>
                        {emp.FirstName} {emp.LastName} ({emp.EmployeeNumber})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="month"
                    name="Month"
                    placeholder="Month"
                    value={form.Month}
                    onChange={handleChange}
                    className="form-control"
                    required
                    disabled={!!editing}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    name="GrossSalary"
                    placeholder="Gross Salary"
                    value={form.GrossSalary}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    name="TotalDeduction"
                    placeholder="Total Deduction"
                    value={form.TotalDeduction}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    name="NetSalary"
                    placeholder="Net Salary"
                    value={form.NetSalary}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold"
                >
                  {editing ? "Update Salary" : "Add Salary"}
                </button>
                {editing && (
                  <button
                    type="button"
                    className="btn btn-secondary w-100 fw-bold mt-2"
                    onClick={handleCancelEdit}
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-10">
          <h3>Salary List</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Employee Number</th>
                <th>Month</th>
                <th>Gross Salary</th>
                <th>Total Deduction</th>
                <th>Net Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((sal) => (
                <tr key={sal.EmployeeNumber + sal.Month}>
                  <td>{sal.EmployeeNumber}</td>
                  <td>{sal.Month}</td>
                  <td>{sal.GrossSalary}</td>
                  <td>{sal.TotalDeduction}</td>
                  <td>{sal.NetSalary}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(sal)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(sal.EmployeeNumber)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {salaries.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No salaries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Salary;