import { useState } from "react";

export default function Explainer() {
  const [text, setText] = useState("");
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setExplanation(data);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Explain Announcement</h2>
      <p style={{ color: "var(--text-dim)", marginBottom: "1rem" }}>
        Paste an announcement or assignment text below to get a summary.
      </p>

      <textarea
        rows="6"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text here..."
      />

      <div style={{ marginTop: "1rem", textAlign: "right" }}>
        <button
          onClick={handleExplain}
          className="action-btn"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Explain"}
        </button>
      </div>

      {explanation && (
        <div className="response-area">
          <h3>Summary</h3>
          <p>{explanation.summary}</p>

          <h4 style={{ marginTop: "1rem" }}>Key Points</h4>
          <ul>
            {explanation.key_points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
