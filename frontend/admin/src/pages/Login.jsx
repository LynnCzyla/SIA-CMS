// frontend/admin/src/pages/Login.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import "../css/Login.css";
import { Link } from "react-router-dom";
import logoCross from "../assets/logo+.svg";
import logoLine from "../assets/logo-.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("🔹 Backend response:", data);

      if (!response.ok || !data.success) {
        Swal.fire({
          title: "Login Failed",
          text: data.message || "Invalid credentials",
          icon: "error",
        });
        return;
      }

      const { user, token } = data; // <-- include token
      Swal.fire({
        title: "Login Successful!",
        text: `Welcome back, ${user.full_name}!`,
        icon: "success",
      }).then(() => {
        // Save login info to localStorage
        localStorage.setItem("auth", "true");
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token); // <-- store token

        // Redirect to dashboard
        window.location.href = "/dashboard";
      });
    } catch (error) {
      console.error("❌ Frontend error:", error);
      Swal.fire({
        title: "Server Error",
        text: "Unable to connect to backend.",
        icon: "warning",
      });
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Branding Section */}
      <div className="login-left">
        <img className="cross" src={logoCross}/>
        <img className="line" src={logoLine} />
        <div className="login-brand">
          <h1>
            Medi
            <span style={{ color: "var(--primary-color2)" }}>Sync</span>
          </h1>
          <p className="info">Health Medical Center</p>
          <p className="copyright">© 2025 BSIT-3E. All rights reserved.</p>
        </div>
      </div>

      {/* Right Login Form Section */}
      <div className="login-right">
        <div className="login-box">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="show-pass">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>

            <button type="submit">LOG IN</button>

            <div className="forgot">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
