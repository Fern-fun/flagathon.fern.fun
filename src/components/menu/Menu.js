import React, { useState, useEffect } from "react";
import "./Menu.scss";
import Hamburger from "./Hamburger";
import { Link } from "react-router-dom";
import Toggle from "../toggle/toggle";

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false);
	const isOpenHandler = () => {
		setIsOpen(!isOpen);
	};
	const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
	const [isDark, setIsDark] = useState(
		JSON.parse(localStorage.getItem("isDark")) === false
			? JSON.parse(localStorage.getItem("isDark"))
			: prefersDarkMode.matches
	);
	const isDarkHandler = () => {
		setIsDark((isDark) => !isDark);
	};
	const body = document.querySelector("body");
	useEffect(() => {
		if (isDark) {
			body.classList.add("dark-theme");
		} else {
			body.classList.remove("dark-theme");
		}
	}, [isDark]);
	useEffect(() => {
		localStorage.setItem("isDark", JSON.stringify(isDark));
	}, [isDark]);
	const menuHandler = (e) => {
		// console.log(e.target);
		// if (e.target.offsetParent.classList.contains("menu__nav-item")) {
		// 	if (document.querySelector(".menu__nav-item.active")) {
		// 		document
		// 			.querySelector(".menu__nav-item.active")
		// 			.classList.remove("active");
		// 	}
		// 	e.target.offsetParent.classList.add("active");
		// }
	};

	return (
		<div
			style={{
				position: "fixed",
				top: "0px",
				left: "0px",
				right: "0px",
				zIndex: "3"
			}}
		>
			<div className={`menu outline color${isOpen ? " active" : ""}`}>
				<h1 className="menu__header major-mono-display">flAgAthon</h1>
				<ul className={`menu__nav montserrat${isOpen ? " active" : ""}`}>
					<li className="menu__nav-item" onClick={menuHandler}>
						<Link to="/">
							<span className="icon">home</span> Home
						</Link>
					</li>
					<li className="menu__nav-item" onClick={menuHandler}>
						<Link to="/play">
							<span className="icon">play_arrow</span> Play
						</Link>
					</li>
					<li className="menu__nav-item" onClick={menuHandler}>
						<Link to="/learn">
							<span className="icon">school</span> Learn
						</Link>
					</li>
					<li className="menu__nav-item" onClick={menuHandler}>
						<Link to="/about">
							<span className="icon">help_outline</span> About
						</Link>
					</li>
				</ul>
				<Hamburger open={isOpen} onClick={isOpenHandler} />
				<Toggle checked={isDark} handler={isDarkHandler} />
			</div>
		</div>
	);
}
