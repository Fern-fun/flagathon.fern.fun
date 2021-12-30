import Card from "../card/Card";
import { Link } from "react-router-dom";

export default function MainMenu() {
	const gameModes = [
		{ name: "Writing", link: "" },
		{ name: "Choose", link: "/play" },
		{ name: "Flex", link: "" },
		{ name: "Solo Q", link: "" }
	];

	return (
		<div
			className="MainMenu"
			style={{ display: "grid", placeItems: "center", height: "75vh" }}
		>
			<Card
				flex
				header="Game modes"
				buttons={gameModes.map((mode, index) => {
					return (
						<Link to={mode.link} className="button" key={index}>
							{mode.name}
						</Link>
					);
				})}
			></Card>
		</div>
	);
}
