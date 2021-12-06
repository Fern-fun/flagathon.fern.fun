import React from "react";
import "./Card.scss";

export default function Card(props) {
	return (
		<div className={`card ${props.flex ? "card__flex" : null}`}>
			<div className="card__heading">
				<h1 className="card__header montserrat">{props.header}</h1>
			</div>
			<div className="card__content">{props.content}</div>
			<div className="card__buttons">{props.buttons}</div>
			{props.additional ? (
				<div className="card__content-additional">{props.additional}</div>
			) : null}
		</div>
	);
}
