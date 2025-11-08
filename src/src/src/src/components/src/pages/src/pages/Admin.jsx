import React from "react";
import { useNavigate } from "react-router-dom";
import TopRibbon from "../components/TopRibbon";

export default function Admin() {
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
        <aside className="sidebar">
          <h2>Mental Health Support</h2>
          <nav>
            <a className="active">Dashboard</a>
            <a>Resources</a>
            <a>Sessions</a>
            <a>Analytics</a>
            <a onClick={logout} style={{ cursor: "pointer" }}>Logout</a>
          </nav>
        </aside>

        <main className="main">
          <div className="topbar">
            <div className="user-btn">Admin: {stored?.username}</div>
          </div>

          <h2>Admin Dashboard</h2>
          <div className="cards">
            <div className="card">
              <h3>Manage Resources</h3>
              <p>Add or update content.</p>
            </div>
            <div className="card">
              <h3>Manage Sessions</h3>
              <p>Schedule counseling sessions.</p>
            </div>
            <div className="card">
              <h3>Reports</h3>
              <p>View analytics.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
