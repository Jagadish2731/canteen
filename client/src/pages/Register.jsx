import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { MdPerson, MdEmail, MdPhone, MdLock, MdAdminPanelSettings } from "react-icons/md";
import "../style/UserCSS/register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await registerUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
      });

      alert(res.message || "Registered successfully ✅");

      // ✅ Save token + user
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // ✅ Redirect based on role
      if (res.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }

    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2><b>Campus Canteen</b></h2>
        <h3>Create Your Account</h3>

        {/* ✅ Show error */}
        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            ❌ {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="input-group">
            <MdPerson className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <MdEmail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="input-group">
            <MdPhone className="input-icon" />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <MdLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="input-group confirm-group">
            <MdLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* ✅ Role Selection */}
          <div className="role-selection">
            <label
              className={`role-option user-role ${
                form.role === "user" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="role"
                value="user"
                checked={form.role === "user"}
                onChange={handleChange}
              />
              <MdPerson className="role-icon" />
              User
            </label>

            <label
              className={`role-option admin-role ${
                form.role === "admin" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="role"
                value="admin"
                checked={form.role === "admin"}
                onChange={handleChange}
              />
              <MdAdminPanelSettings className="role-icon" />
              Admin
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p>
          Already have an account?{" "}
          <a onClick={() => navigate("/")}>Login</a>
        </p>

      </div>
    </div>
  );
}

export default Register;