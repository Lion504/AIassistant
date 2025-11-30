import React, { useState } from "react";
import Navigator from "./Navigator";
import Explainer from "./Explainer";
import Electives from "./Electives";

const AIAssistant = () => {
  const [activeFeature, setActiveFeature] = useState("navigator");

  return (
    <div className="ai-assistant-container">
      <div className="ai-sidebar">
        <button
          className={`ai-nav-btn ${activeFeature === "navigator" ? "active" : ""}`}
          onClick={() => setActiveFeature("navigator")}
        >
          🧭 Navigator
        </button>
        <button
          className={`ai-nav-btn ${activeFeature === "explain" ? "active" : ""}`}
          onClick={() => setActiveFeature("explain")}
        >
          📢 Explainer
        </button>
        <button
          className={`ai-nav-btn ${activeFeature === "electives" ? "active" : ""}`}
          onClick={() => setActiveFeature("electives")}
        >
          🎓 Electives
        </button>
      </div>

      <div className="ai-content-area">
        {activeFeature === "navigator" && <Navigator />}
        {activeFeature === "explain" && <Explainer />}
        {activeFeature === "electives" && <Electives />}
      </div>
    </div>
  );
};

export default AIAssistant;
