import React from "react";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">Utility App</h1>
      <p className="byline">
        by{" "}
        <a
          className="nav-link"
          href="http://www.benrdOdera.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Odera's website"
        >
          Odera
        </a>
      </p>
    </header>
  );
}

export default Header;
