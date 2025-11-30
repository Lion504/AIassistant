import React from "react";

const OMANav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "desktop", label: "Työpöytä" },
    { id: "studies", label: "Opinnot" },
    { id: "workspaces", label: "Työtilat" },
    { id: "ai-assistant", label: "AI Assistant ✨" },
  ];

  return (
    <nav id="main-nav-container">
      <ul id="main-nav" className="nav navbar-nav subnavi active-subnavi">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? "selected" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <a href="#" onClick={(e) => e.preventDefault()}>
              <span>{tab.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default OMANav;
