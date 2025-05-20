import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AddDepartment() {
  const [form, setForm] = useState({
    DepartementCode: "",
    DepartementName: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/departments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage("Department added successfully!");
        setForm({
          DepartementCode: "",
          DepartementName: "",
        });
      })
      .catch(() => setMessage("Error adding department."));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Add Department</h2>
              {message && (
                <div className="alert alert-success text-center">{message}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="DepartementCode"
                    placeholder="Department Code"
                    value={form.DepartementCode}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="DepartementName"
                    placeholder="Department Name"
                    value={form.DepartementName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold"
                >
                  Add Department
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDepartment;