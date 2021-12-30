import React, { useState } from "react";
import "./Menu.scss";
import Hamburger from "./Hamburger";
import { Link } from "react-router-dom";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0px",
        left: "0px",
        right: "0px",
        zIndex: "3",
      }}
    >
      <div className={`menu outline color${isOpen ? " active" : ""}`}>
        <h1 className="menu__header major-mono-display">flAgAthon</h1>
        <ul className={`menu__nav montserrat${isOpen ? " active" : ""}`}>
          <li className="menu__nav-item">
            <Link to="/">
              <span className="icon">home</span> Home
            </Link>
          </li>
          <li className="menu__nav-item">
            <Link to="/play">
              <span className="icon">play_arrow</span> Play
            </Link>
          </li>
          <li className="menu__nav-item">
            <Link to="/learn">
              <span className="icon">school</span> Learn
            </Link>
          </li>
          <li className="menu__nav-item">
            <Link to="/about">
              <span className="icon">help_outline</span> About
            </Link>
          </li>
        </ul>
        <Hamburger open={isOpen} onClick={isOpenHandler} />
      </div>
    </div>
  );
}
