import React from "react";
import "./Card.scss";

export default function Card(props) {
	return (
		<div
			className={`card ${props.flex ? "card__flex" : null}`}
			style={props.style}
		>
			{props.header ? (
				<div className="card__heading">
					<h1 className="card__header montserrat">{props.header}</h1>
				</div>
			) : null}
			{props.content ? (
				<div className="card__content">{props.content}</div>
			) : null}
			{props.buttons ? (
				<div className="card__buttons">{props.buttons}</div>
			) : null}
			{props.additional ? (
				<div className="card__content-additional">{props.additional}</div>
			) : null}
		</div>
	);
}
