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

	return (
		<div className="toggle menu__dark-mode-toggle" onClick={darkModeHandler}>
			{isToggleOn ? (
				<span className="icon" ref={lightMode}>
					light_mode
				</span>
			) : (
				<span className="icon" ref={darkMode}>
					dark_mode
				</span>
			)}
		</div>
	);
}
