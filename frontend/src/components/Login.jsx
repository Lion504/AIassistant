import React, { useState } from "react";

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data); // Pass full user data (token, role, username)
      } else {
        setError(data.error || "Login failed");
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
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "2rem",
          background: "linear-gradient(to right, #fff, #94a3b8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Welcome to OMA
      </h1>

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
          Login
        </button>
      </form>

      <p style={{ marginTop: "20px", color: "#aaa" }}>
        Don't have an account?{" "}
        <span
          onClick={onSwitchToSignup}
          style={{ color: "var(--primary-color)", cursor: "pointer" }}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
