import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopRibbon from "../components/TopRibbon";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // initialize demo users in localStorage (only if not present)
  useEffect(() => {
    if (!localStorage.getItem("users")) {
      const demo = [
        { role: "user", username: "user1", password: "user123" },
        { role: "admin", username: "admin1", password: "admin123" },
      ];
      localStorage.setItem("users", JSON.stringify(demo));
    }
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setError("");
    const stored = JSON.parse(localStorage.getItem("users")) || [];
    const found = stored.find(
      (u) => u.username === username && u.password === password && u.role === role
    );
    if (found) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(found));
      if (found.role === "admin") navigate("/admin");
      else navigate("/user");
    } else {
      setError("Invalid credentials — check username, password, and role.");
    }
  };

  return (
    <>
      <TopRibbon />
      <div className="login-container">
        <div className="login-form-panel">
          <div className="toggle-container">
            <button
              className={`toggle-btn ${role === "user" ? "active-toggle" : ""}`}
              onClick={() => setRole("user")}
            >
              User
            </button>
            <button
              className={`toggle-btn ${role === "admin" ? "active-toggle" : ""}`}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
          </div>

          <form className="login-form" onSubmit={submit}>
            <input
              type="text"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="submit-button" type="submit">Login</button>
            {error && <div className="error">{error}</div>}
            <div className="hint">
              Demo: admin1/admin123 (admin) — user1/user123 (user)
            </div>
          </form>
        </div>

        <div className="featured-panel">
          <div className="card-overlay">
            <h3 className="card-title">Your Mental Health Matters</h3>
            <p className="card-text">
              MindCare provides personalized mental health support for a healthier, happier life.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
