import InsightsGraph from "./InsightsGraph";

const TeacherDashboard = ({ onNavigate }) => {
  return (
    <div className="teacher-dashboard">
      <div className="dashboard-grid">
        {/* Column 1: Teacher Info & Schedule */}
        <div className="dashboard-column">
          {/* Teacher Profile */}
          <div
            className="widget-card"
            style={{ borderTop: "4px solid #10b981" }}
          >
            <div className="widget-header">
              <h3>
                <i className="fa fa-id-card-o" style={{ color: "#10b981" }}></i>{" "}
                Teacher Profile
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#334155",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  color: "#94a3b8",
                }}
              >
                <i className="fa fa-user"></i>
              </div>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Dr. Sarah Smith
                </div>
                <div style={{ color: "var(--text-muted)" }}>
                  Senior Lecturer, IT
                </div>
              </div>
            </div>
            <div className="study-info-row">
              <span>Department</span>
              <span>Information Technology</span>
            </div>
            <div className="study-info-row">
              <span>Office</span>
              <span>B304</span>
            </div>
          </div>

          {/* Schedule */}
          <div className="widget-card">
            <div className="widget-header">
              <h3>
                <i className="fa fa-calendar"></i> Today's Schedule
              </h3>
            </div>
            {[
              {
                time: "09:00 - 12:00",
                course: "Web Development",
                room: "A201",
              },
              {
                time: "13:00 - 15:00",
                course: "Thesis Supervision",
                room: "B304",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid var(--glass-border)",
                }}
              >
                <div style={{ fontWeight: "bold", color: "#10b981" }}>
                  {item.time}
                </div>
                <div>{item.course}</div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  <i className="fa fa-map-marker"></i> {item.room}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: My Courses */}
        <div className="dashboard-column">
          <div className="widget-card">
            <div className="widget-header">
              <h3>
                <i className="fa fa-book"></i> My Courses
              </h3>
            </div>
            {[
              { title: "Web Development", code: "TX00EY23-3011", students: 45 },
              {
                title: "Mobile Programming",
                code: "TX00EY24-3012",
                students: 38,
              },
              {
                title: "Software Project",
                code: "TX00EY25-3013",
                students: 12,
              },
            ].map((course, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid var(--glass-border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: "500", color: "#60a5fa" }}>
                    {course.title}
                  </div>
                  <div
                    style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                  >
                    {course.code}
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontSize: "0.8rem",
                  }}
                >
                  {course.students} students
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Shortcuts */}
        <div className="dashboard-column">
          <div className="widget-card">
            <div className="widget-header">
              <h3>
                <i className="fa fa-external-link"></i> Shortcuts
              </h3>
            </div>
            <div className="shortcuts-grid">
              {[
                { icon: "fa-pencil", label: "Grading" },
                { icon: "fa-envelope", label: "Email" },
                { icon: "fa-calendar", label: "Rooms" },
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
                        ? { background: "#10b981", color: "white" }
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
        </div>
      </div>

      {/* Full Width Section: AI Student Insights */}
      <div
        className="widget-card"
        style={{
          marginTop: "20px",
          background:
            "linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(6, 95, 70, 0.05))",
          borderColor: "#10b981",
        }}
      >
        <div
          className="widget-header"
          style={{ borderBottomColor: "rgba(16, 185, 129, 0.3)" }}
        >
          <h3 style={{ color: "#34d399" }}>
            <i className="fa fa-magic" style={{ color: "#34d399" }}></i> AI
            Student Insights
          </h3>
          <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Real-time analysis of student queries
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
          }}
        >
          {/* Left: Graphs */}
          <div>
            <InsightsGraph />
          </div>

          {/* Right: Detailed List */}
          <div
            style={{
              background: "rgba(0,0,0,0.2)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <h4 style={{ marginBottom: "15px", color: "#fff" }}>
              Trending Questions
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {[
                {
                  question: "When is the deadline for the React assignment?",
                  count: 42,
                  trend: "up",
                },
                {
                  question: "How do I fix the CORS error in the backend?",
                  count: 28,
                  trend: "up",
                },
                {
                  question: "Is the exam open book?",
                  count: 15,
                  trend: "stable",
                },
                {
                  question: "Where can I find the lecture slides for Week 4?",
                  count: 12,
                  trend: "down",
                },
              ].map((insight, i) => (
                <div
                  key={i}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    paddingBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "500",
                      fontSize: "0.95rem",
                      marginBottom: "5px",
                    }}
                  >
                    "{insight.question}"
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ color: "#34d399", fontWeight: "bold" }}>
                      {insight.count} queries
                    </span>
                    {insight.trend === "up" && (
                      <span
                        style={{
                          color: "#ef4444",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <i className="fa fa-arrow-up"></i> Rising
                      </span>
                    )}
                    {insight.trend === "down" && (
                      <span
                        style={{
                          color: "#10b981",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <i className="fa fa-arrow-down"></i> Falling
                      </span>
                    )}
                    {insight.trend === "stable" && (
                      <span
                        style={{
                          color: "#94a3b8",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <i className="fa fa-minus"></i> Stable
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="action-btn"
              style={{
                marginTop: "20px",
                background: "transparent",
                border: "1px solid #10b981",
                color: "#10b981",
                width: "100%",
              }}
            >
              View All Queries
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button className="action-btn" style={{ background: "#10b981" }}>
            Download Detailed Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
