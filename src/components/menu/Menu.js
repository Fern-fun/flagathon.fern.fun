import React, { useState } from "react";
import "./Menu.scss";
import Hamburger from "./Hamburger";

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false);
	const isOpenHandler = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div style={{ position: "fixed", top: "0px", left: "0px", right: "0px" }}>
			<div className={`menu outline color${isOpen ? " active" : ""}`}>
				<h1 className="menu__header major-mono-display">flAgAthon</h1>
				<ul className={`menu__nav montserrat${isOpen ? " active" : ""}`}>
					<li className="menu__nav-item">
						<span className="icon">home</span> Home
					</li>
					<li className="menu__nav-item">
						<span className="icon">play_arrow</span> Play
					</li>
					<li className="menu__nav-item">
						<span className="icon">school</span> Learn
					</li>
					<li className="menu__nav-item">
						<span className="icon">help_outline</span> About
					</li>
				</ul>
				<Hamburger open={isOpen} onClick={isOpenHandler} />
			</div>
		</div>
	);
}
