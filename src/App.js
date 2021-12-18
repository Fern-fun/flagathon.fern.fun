import Menu from "./components/menu/Menu.js";
import Quiz from "./components/quiz/Quiz.js";
import MainMenu from "./components/mainMenu/MainMenu.js";
import NoMatch from "./components/noMatch/NoMatch.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App">
				<Menu></Menu>

				<Routes>
					<Route exact path="/" element={<MainMenu />} />
					<Route path="/world_quiz" element={<Quiz />} />

					<Route path="*" element={<NoMatch />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
