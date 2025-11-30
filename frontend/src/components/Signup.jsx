import React, { useState } from "react";

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        onSignup(username, password); // Auto-fill login or auto-login
      } else {
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Connection error");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "2rem", color: "#fff" }}>Create Account</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "300px",
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #444",
            background: "#222",
            color: "#fff",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #444",
            background: "#222",
            color: "#fff",
          }}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #444",
            background: "#222",
            color: "#fff",
          }}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            background: "var(--primary-color)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Sign Up
        </button>
      </form>

      <p style={{ marginTop: "20px", color: "#aaa" }}>
        Already have an account?{" "}
        <span
          onClick={onSwitchToLogin}
          style={{ color: "var(--primary-color)", cursor: "pointer" }}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
