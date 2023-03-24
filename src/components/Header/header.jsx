import React from "react";
import { Link } from "react-router-dom";

import "./header.css";
import "../../global.css";

function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        ALKABOT BLOG
      </Link>
    </header>
  );
}

export default Header;
