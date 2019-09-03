import React from "react";
import "./Header.css";

// Header Layout
const Header = props => (
    <div className="header">
      <div className="title">{props.children}</div>
      <div className="scores">
        <div>{props.status}</div>
      </div>
    </div>
);

export default Header;