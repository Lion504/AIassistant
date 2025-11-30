import React from "react";

const OMAHeader = () => {
  return (
    <header id="main-header" className="e">
      <div className="header-inner">
        <div className="logo-container">
          <a href="/" className="logo">
            <img
              src="https://oma.metropolia.fi/metropolia-theme/images/metropolia/logo.png"
              alt="Metropolia"
              style={{ height: "40px" }}
            />
          </a>
        </div>
        <div className="user-profile">
          <span className="user-name">Yongzhi Wang</span>
          <span className="user-icon">👤</span>
        </div>
      </div>
    </header>
  );
};

export default OMAHeader;
