import React from "react";
import { useNavigate } from "react-router-dom";
import TopRibbon from "../components/TopRibbon";

export default function User() {
  const navigate = useNavigate();
  const stored = JSON.parse(sessionStorage.getItem("loggedInUser") || "null");

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <TopRibbon />
      <div className="dashboard">
        <aside className="sidebar user-side">
          <h2>Mental Health Support</h2>
          <nav>
            <a className="active">Dashboard</a>
            <a>Resources</a>
            <a>Sessions</a>
            <a>Support Groups</a>
            <a onClick={logout} style={{ cursor: "pointer" }}>Logout</a>
          </nav>
        </aside>

        <main className="main">
          <div className="topbar">
            <div className="user-btn">User: {stored?.username}</div>
          </div>

          <h2>Student Dashboard</h2>
          <div className="cards">
            <div className="card">
              <h3>Resources</h3>
              <p>Self-help guides and articles.</p>
            </div>
            <div className="card">
              <h3>Therapy Sessions</h3>
              <p>Join virtual counseling sessions.</p>
            </div>
            <div className="card">
              <h3>Support Groups</h3>
              <p>Connect with peers.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
