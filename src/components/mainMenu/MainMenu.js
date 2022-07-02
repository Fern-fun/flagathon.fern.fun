import react, { useEffect, useState } from "react";
import Card from "../card/Card";
import { Link } from "react-router-dom";
import { getCodes, guessRandomFlag } from "../quiz/QuizFunctions";
export default function MainMenu() {
  const [codes, setCodes] = useState([]);
  const [img, setImg] = useState([]);

  const [reloadRandomCountry, setReloadRandomCountry] = useState(false);

  useEffect(() => {
    getCodes().then((data) => setCodes(data));
    fetch("https://api.fern.fun/flagathon/country/random/")
      .then((response) => response.json())
      .then((data) => {
        setImg(data);
      });
  }, [reloadRandomCountry]);

  const gameModes = [
    // { name: "Writing", link: "" },
    { name: "Choose", link: "/play" },
    // { name: "Flex", link: "" },
    // { name: "Solo Q", link: "" },
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

      <Card
        header="Guess random flag"
        content={<img src={img["flag"]} alt={img["flag"]} />}
        buttons={
          <input
            type={"text"}
            className="button"
            onChange={(e) =>
              guessRandomFlag(e, img["country"], codes, setReloadRandomCountry)
            }
          ></input>
        }
      ></Card>
    </div>
  );
}
