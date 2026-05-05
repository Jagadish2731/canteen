import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { loginUser } from "../services/api";
import "../style/UserCSS/login.css";
 
// ✅ Hardcoded admin credentials (fallback if backend is off)
const ADMIN_EMAIL    = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";
 
function Login() {
  const navigate = useNavigate();
 
  const [form, setForm]       = useState({ email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
 
    const { email, password } = form;
 
    // ── Hardcoded admin shortcut ──────────────────────────────
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(
        "user",
        JSON.stringify({ email: ADMIN_EMAIL, role: "admin", name: "Admin" })
      );
      localStorage.setItem("token", "admin-token");
      setLoading(false);
      navigate("/admin");
      return;
    }
 
    // ── Regular user — call backend ───────────────────────────
    try {
      const res = await loginUser({ email, password });
 
      // Save token + full user object (includes name, email, profilePicture, role)
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
 
      // Redirect based on role
      if (res.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
 
    } catch (err) {
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="login-container">
      <div className="login-card">
 
        <h2>Campus Canteen</h2>
        <h3>Login To Your Account</h3>
 
        {error && <p className="error-msg">❌ {error}</p>}
 
        <form onSubmit={handleSubmit}>
 
          {/* Email */}
          <div className="input-group">
            <MdEmail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
 
          {/* Password */}
          <div className="input-group">
            <MdLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
 
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
 
        </form>
 
        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
 
      </div>
    </div>
  );
}
 
export default Login;
 