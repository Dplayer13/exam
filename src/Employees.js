import React, { useState, useEffect } from "react";
import axios from "axios";

function Employees() {
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
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch employees
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employees", { withCredentials: true })
      .then((res) => setEmployees(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/employees", form, { withCredentials: true })
      .then((res) => {
        setMessage("Employee added!");
        // Refresh employee list
        return axios.get("http://localhost:3000/api/employees", { withCredentials: true });
      })
      .then((res) => setEmployees(res.data))
      .catch(() => setMessage("Error adding employee."));
  };

  return (
    <div className="container mt-5">
      <h2>Add Employee</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        {/* Render input fields for each form property */}
        <input
          type="text"
          name="EmployeeNumber"
          placeholder="Employee Number"
          value={form.EmployeeNumber}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        {/* Add other fields similarly... */}
        <button className="btn btn-primary" type="submit">
          Add Employee
        </button>
      </form>
      <h3 className="mt-4">Employee List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Employee Number</th>
            <th>Name</th>
            <th>Position</th>
            {/* Add other columns as needed */}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.EmployeeNumber}>
              <td>{emp.EmployeeNumber}</td>
              <td>{emp.FirstName} {emp.LastName}</td>
              <td>{emp.Position}</td>
              {/* Add other columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;