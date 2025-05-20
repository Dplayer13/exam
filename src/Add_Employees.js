import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AddEmployees() {
  const [form, setForm] = useState({
    EmployeeNumber: "",
    FirstName: "",
    LastName: "",
    Position: "",
    Address: "",
    Telephone: "",
    Gender: "",
    HiredDate: "",
    DepartementCode: "",
  });
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage("Employee added successfully!");
        setForm({
          EmployeeNumber: "",
          FirstName: "",
          LastName: "",
          Position: "",
          Address: "",
          Telephone: "",
          Gender: "",
          HiredDate: "",
          DepartementCode: "",
        });
      })
      .catch(() => setMessage("Error adding employee."));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Add Employee</h2>
              {message && (
                <div className="alert alert-success text-center">{message}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      name="EmployeeNumber"
                      placeholder="Employee Number"
                      value={form.EmployeeNumber}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col">
                    <select
                      name="DepartementCode"
                      value={form.DepartementCode}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.DepartementCode} value={dept.DepartementCode}>
                          {dept.DepartementName} ({dept.DepartementCode})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* ...rest of your form... */}
                {/* Keep the rest of your form fields here as before */}
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      name="FirstName"
                      placeholder="First Name"
                      value={form.FirstName}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      name="LastName"
                      placeholder="Last Name"
                      value={form.LastName}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                {/* ...other fields... */}
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      name="Position"
                      placeholder="Position"
                      value={form.Position}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      name="Address"
                      placeholder="Address"
                      value={form.Address}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      name="Telephone"
                      placeholder="Telephone"
                      value={form.Telephone}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col">
                    <select
                      name="Gender"
                      value={form.Gender}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="date"
                    name="HiredDate"
                    value={form.HiredDate}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold"
                >
                  Add Employee
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployees;