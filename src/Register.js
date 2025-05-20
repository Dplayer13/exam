import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



function RegisterLogin() {
  const [form, setForm] = useState({ UserName: "", Password: "" });
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // <-- Add this

fetch("http://localhost:3000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify(form),
})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/auth/${isLogin ? "login" : "register"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message || data.error);
        if (data.user && isLogin) {
          navigate("/dashboard"); // <-- Redirect after successful login
        }
      });
  };

  return (
    <div className="container mt-5" style={{maxWidth: 400}}>
      <h2 className="mb-3 text-center">{isLogin ? "Login" : "Register"}</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="UserName"
            placeholder="User Name"
            value={form.UserName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={form.Password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <button
        className="btn btn-link w-100 mt-2"
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage("");
        }}
      >
        {isLogin ? "Create an account" : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default RegisterLogin;