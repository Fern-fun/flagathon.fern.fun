import React from "react";
import "./Menu.scss";

export default function Hamburger(props) {
	const open = props.open;

	return (
		<div className="menu__hamburger" onClick={props.onClick}>
			<div className={`menu__hamburger-line${open ? " active" : ""}`}></div>
			<div className={`menu__hamburger-line${open ? " active" : ""}`}></div>
			<div className={`menu__hamburger-line${open ? " active" : ""}`}></div>
		</div>
	);
}
