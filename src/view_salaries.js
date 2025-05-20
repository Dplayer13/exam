import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewSalaries() {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null); // EmployeeNumber
  const [editForm, setEditForm] = useState({
    EmployeeNumber: "",
    Month: "",
    GrossSalary: "",
    TotalDeduction: "",
    NetSalary: "",
  });

  // Fetch all salaries
  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = () => {
    fetch("http://localhost:3000/api/salaries")
      .then((res) => res.json())
      .then((data) => {
        setSalaries(data);
        setLoading(false);
      });
  };

  // Delete salary by EmployeeNumber
  const handleDelete = (EmployeeNumber) => {
    if (!window.confirm("Are you sure you want to delete this salary?")) return;
    fetch(`http://localhost:3000/api/salaries/${EmployeeNumber}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => fetchSalaries());
  };

  // Start editing
  const handleEdit = (salary) => {
    setEditId(salary.EmployeeNumber);
    setEditForm({
      EmployeeNumber: salary.EmployeeNumber,
      Month: salary.Month,
      GrossSalary: salary.GrossSalary,
      TotalDeduction: salary.TotalDeduction,
      NetSalary: salary.NetSalary,
    });
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Submit edit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/salaries/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    })
      .then((res) => res.json())
      .then(() => {
        setEditId(null);
        fetchSalaries();
      });
  };

  if (loading) {
    return <div className="text-center mt-5">Loading salaries...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Salaries</h2>
      <table className="table table-bordered table-striped shadow">
        <thead className="table-primary">
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
          {salaries.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No salaries found.
              </td>
            </tr>
          ) : (
            salaries.map((salary) =>
              editId === salary.EmployeeNumber ? (
                <tr key={salary.EmployeeNumber}>
                  <td>
                    <input
                      type="text"
                      name="EmployeeNumber"
                      value={editForm.EmployeeNumber}
                      onChange={handleEditChange}
                      className="form-control"
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="month"
                      name="Month"
                      value={editForm.Month}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="GrossSalary"
                      value={editForm.GrossSalary}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="TotalDeduction"
                      value={editForm.TotalDeduction}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="NetSalary"
                      value={editForm.NetSalary}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={handleEditSubmit}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={salary.EmployeeNumber}>
                  <td>{salary.EmployeeNumber}</td>
                  <td>{salary.Month}</td>
                  <td>{salary.GrossSalary}</td>
                  <td>{salary.TotalDeduction}</td>
                  <td>{salary.NetSalary}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(salary)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(salary.EmployeeNumber)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewSalaries;