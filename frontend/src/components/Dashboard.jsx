import React, { useState } from "react";
import announcementsData from "../../../backend/data/announcements.json";

const Dashboard = ({ onNavigate }) => {
  const [announcements] = useState(announcementsData.slice(0, 3));

  return (
    <div className="dashboard-grid">
      {/* Column 1: Study Info & Workspaces */}
      <div className="dashboard-column">
        {/* Study Entitlement Info */}
        <div className="widget-card" style={{ borderTop: "4px solid #3b82f6" }}>
          <div className="widget-header">
            <h3>
              <i
                className="fa fa-graduation-cap"
                style={{ color: "#3b82f6" }}
              ></i>{" "}
              Study entitlement
            </h3>
          </div>
          <div className="study-info-row">
            <strong>Test Student</strong>
            <span>1234567</span>
          </div>
          <div className="study-info-row">
            <span>Degree Programme in IT</span>
            <span style={{ color: "#4ade80" }}>ATTENDING AUTUMN 2025</span>
          </div>

          <div className="study-progress">
            <div className="progress-circle" style={{ borderColor: "#3b82f6" }}>
              91
            </div>
            <div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                91 cr
              </div>
              <div style={{ color: "var(--text-muted)" }}>(240 cr)</div>
            </div>
          </div>
        </div>

        {/* Workspaces */}
        <div className="widget-card">
          <div className="widget-header">
            <h3>
              <i className="fa fa-briefcase"></i> Workspaces
            </h3>
            <i className="fa fa-refresh" style={{ cursor: "pointer" }}></i>
          </div>
          <input
            type="text"
            placeholder="Search from my workspaces"
            style={{ marginBottom: "15px", padding: "10px" }}
          />

          <div className="workspace-list">
            {[
              { title: "Ethical Hacking", code: "TX00EY35-3011" },
              { title: "Navigating Finnish Work Life", code: "XX00GL67-3001" },
              { title: "Probability and Statistics", code: "TT00ES94-3046" },
              { title: "Suomi 3 (A2.1-A2.2)", code: "XX00EL30-3035" },
              { title: "Web Development", code: "TX00EY23-3011" },
            ].map((ws, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid var(--glass-border)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontWeight: "500", color: "#60a5fa" }}>
                    {ws.title}
                  </div>
                  <div
                    style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                  >
                    {ws.code}
                  </div>
                </div>
                <i
                  className="fa fa-bars"
                  style={{ color: "var(--text-muted)" }}
                ></i>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Column 2: Student Guide & Announcements */}
      <div className="dashboard-column">
        {/* Student's Guide Hero */}
        <div className="student-guide-hero">
          <h2>STUDENT'S GUIDE</h2>
          <p>Information on studies, news and events</p>
          <div style={{ marginTop: "20px", fontWeight: "bold" }}>
            students.metropolia.fi
          </div>
        </div>

        {/* Announcements */}
        <div className="widget-card">
          <div className="widget-header">
            <h3>
              <i className="fa fa-bullhorn"></i> Announcements
            </h3>
          </div>
          {announcements.map((ann, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px",
                paddingBottom: "15px",
                borderBottom: "1px solid var(--glass-border)",
              }}
            >
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--primary-color)",
                  marginBottom: "5px",
                }}
              >
                {new Date(ann.date).toLocaleDateString()}
              </div>
              <a
                href={ann.url}
                style={{
                  fontWeight: "500",
                  color: "var(--text-main)",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                {ann.title}
              </a>
              <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                {ann.snippet || "Click to read more..."}
              </div>
            </div>
          ))}
          <button
            className="action-btn"
            style={{
              background: "transparent",
              border: "1px solid var(--primary-color)",
              color: "var(--primary-color)",
            }}
          >
            Show all announcements
          </button>
        </div>
      </div>

      {/* Column 3: Shortcuts & Feedback */}
      <div className="dashboard-column">
        {/* Shortcuts */}
        <div className="widget-card">
          <div className="widget-header">
            <h3>
              <i className="fa fa-external-link"></i> Shortcuts
            </h3>
          </div>
          <div className="shortcuts-grid">
            {[
              { icon: "fa-pencil", label: "EXAM" },
              { icon: "fa-envelope", label: "Email" },
              { icon: "fa-user-md", label: "Health" },
              { icon: "fa-google", label: "Drive" },
              { icon: "fa-book", label: "Library" },
              { icon: "fa-windows", label: "Office" },
              { icon: "fa-graduation-cap", label: "Moodle" },
              { icon: "fa-cutlery", label: "Menus" },
              { icon: "fa-info-circle", label: "Guide" },
              { icon: "fa-wikipedia-w", label: "Wiki" },
              { icon: "fa-desktop", label: "VDI" },
              {
                icon: "fa-magic",
                label: "AI Assistant",
                action: () => onNavigate("ai_assistant"),
                highlight: true,
              },
            ].map((item, i) => (
              <div key={i} className="shortcut-item" onClick={item.action}>
                <div
                  className="shortcut-icon"
                  style={
                    item.highlight
                      ? { background: "var(--primary-color)", color: "white" }
                      : {}
                  }
                >
                  <i className={`fa ${item.icon}`}></i>
                </div>
                <div className="shortcut-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Feedback */}
        <div
          className="widget-card"
          style={{ background: "#1e3a8a", borderColor: "#3b82f6" }}
        >
          <div
            className="widget-header"
            style={{ borderBottomColor: "rgba(255,255,255,0.2)" }}
          >
            <h3 style={{ color: "white" }}>
              <i className="fa fa-pencil" style={{ color: "white" }}></i> Course
              feedback
            </h3>
          </div>
          <p style={{ color: "rgba(255,255,255,0.8)" }}>
            Give course feedback.
          </p>
        </div>

        {/* General Feedback */}
        <div
          className="widget-card"
          style={{ background: "linear-gradient(135deg, #ea580c, #c2410c)" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              color: "white",
            }}
          >
            <i className="fa fa-envelope-o" style={{ fontSize: "2rem" }}></i>
            <div>
              <h3 style={{ margin: 0, color: "white" }}>
                Give Feedback &gt;&gt;
              </h3>
              <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                about Metropolia's services
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
