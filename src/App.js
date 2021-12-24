import Menu from "./components/menu/Menu.js";
import Quiz from "./components/quiz/Quiz.js";
import MainMenu from "./components/mainMenu/MainMenu.js";
import NoMatch from "./components/noMatch/NoMatch.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Learn from "./components/learn/Learn.js";
import About from "./components/about/About.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Menu></Menu>

        <Routes>
          <Route exact path="/" element={<MainMenu />} />
          <Route path="/play" element={<Quiz />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
