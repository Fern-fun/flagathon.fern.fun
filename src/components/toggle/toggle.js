import React, { useState, useEffect, useRef } from "react";
import "./toggle.scss";

export default function Toggle(props) {
	const [isToggleOn, setToggleOn] = useState(props.checked);
	const lightMode = useRef(null);
	const darkMode = useRef(null);
	const darkModeHandler = () => {
		props.handler();
	};

	useEffect(() => {
		setToggleOn(props.checked);
	}, [props.checked]);
	useEffect(() => {
		if (isToggleOn) {
			lightMode.current.classList.add("active");
			darkMode.current.classList.remove("active");
		} else {
			lightMode.current.classList.remove("active");
			darkMode.current.classList.add("active");
		}
	}, [isToggleOn]);

	return (
		<div className="toggle menu__dark-mode-toggle" onClick={darkModeHandler}>
			<span className="icon" ref={lightMode}>
				light_mode
			</span>
			<span className="icon" ref={darkMode}>
				dark_mode
			</span>
		</div>
	);
}
