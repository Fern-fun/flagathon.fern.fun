import React, { useEffect, useState } from "react";
import * as data from "./codes.json";
import "./Quiz.scss";

export default function Quiz() {
	// function returning a random number
	const random = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	// function shuffling an array
	const shuffleArray = (array) => {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	};

	// User score
	const [score, setScore] = useState(0);

	// Current number (country code) of current country
	const [number, setNumber] = useState(0);

	// Question number tracker
	const [questionNumber, setQuestionNumber] = useState(1);

	// Max question
	const [maxQuestion, setMaxQuestion] = useState(null);

	// All countries of the world
	const countries = Object.values(data.default);

	// ISO3166 codes of the countries
	const countriesCodes = Object.keys(data.default);

	// function to generate random questions
	const generateQuestions = () => {
		const questions1 = [];
		for (let i = 0; i < maxQuestion - 1; i++) {
			const randomNumber = random(0, countries.length - 1);
			if (questions1.indexOf(randomNumber) == -1) {
				// console.log(i);
				questions1.push(randomNumber);
			} else {
				i--;
			}
		}
		setQuestions(questions1);

		const answersGlobal = [];
		for (let j = 0; j < maxQuestion - 1; j++) {
			const answers = [];
			for (let i = 0; i < 4; i++) {
				const randomNumber = random(0, countries.length - 1);
				if (answers.indexOf(randomNumber) == -1) {
					if (i == 3) {
						answers.push(questions1[j]);
					} else {
						answers.push(randomNumber);
					}
				} else {
					i--;
				}
			}
			answersGlobal.push(answers);
		}
		answersGlobal.map((item) => {
			return shuffleArray(item);
		});
		setAnswer(answersGlobal);
	};

	// random countries serving as questions
	const [questions, setQuestions] = useState([]);

	// generated random answers
	const [answer, setAnswer] = useState([]);

	useEffect(() => {
		generateQuestions();
	}, [maxQuestion]);

	// Array with correct past answers
	const [pastCorrectAnswers, setPastCorrectAnswers] = useState([]);

	// Array with past user answers
	const [pastUserAnswers, setPastUserAnswers] = useState([]);

	// Puts the correct answer in the array
	useEffect(() => {
		if (maxQuestion != null) {
			if (pastCorrectAnswers.indexOf(questions[number]) == -1) {
				pastCorrectAnswers.push(questions[number]);
			}
		} // this here works perfectly, don't touch
		if (pastCorrectAnswers[0] == undefined) {
			pastCorrectAnswers.shift();
		}
	}, [questionNumber, maxQuestion, questions]);

	// next question
	const nextFlag = () => {
		if (number !== countries.length - 1 && questionNumber < maxQuestion) {
			setNumber((number) => number + 1);
			setQuestionNumber((questionNumber) => questionNumber + 1);
		}
	};

	// previous question
	const previousFlag = () => {
		if (number !== 0) {
			setNumber((number) => number - 1);
			setQuestionNumber((questionNumber) => questionNumber - 1);
		}
	};

	// When user checks correct answer
	const correct = (event) => {
		// sets the button color to green
		event.target.className += " correct";
		// increases the score by 1
		setScore((score) => score + 1);
		// after 500ms the button color is set back to default and next question is displayed
		setTimeout(() => {
			// adds the correct answer to the array of past correct answers
			pastUserAnswers.push([countries[questions[number]], true]);
			nextFlag();
			event.target.className -= " correct";
		}, 500);
	};

	// When user checks wrong answer
	const incorrect = (event) => {
		event.target.className += " incorrect";
		setTimeout(() => {
			pastUserAnswers.push([event.target.innerText, false]);
			nextFlag();
			event.target.className -= " incorrect";
		}, 500);
	};

	//Play again, resets all variables to their initial state and generates new questions
	const playAgain = () => {
		setScore(0);
		setMaxQuestion(null);
		setQuestionNumber(1);
		setNumber(0);
		setQuestions([]);
		setPastCorrectAnswers([]);
		setPastUserAnswers([]);
		generateQuestions();
	};

	const [expanded, setExpanded] = useState(false);

	// the first page to choose the number of questions
	if (maxQuestion == null) {
		return (
			<div style={{ display: "grid", placeItems: "center", height: "75vh" }}>
				<div className="card card__flex">
					<div className="card__heading">
						<h1 className="card__header montserrat">
							How many questions do you choose?
						</h1>
					</div>
					<div className="card__buttons">
						<button
							className="button"
							onClick={() => {
								setMaxQuestion(6);
							}}
						>
							5
						</button>
						<button
							className="button"
							onClick={() => {
								setMaxQuestion(11);
							}}
						>
							10
						</button>
						<button
							className="button"
							onClick={() => {
								setMaxQuestion(21);
							}}
						>
							20
						</button>
						<button
							className="button"
							onClick={() => {
								setMaxQuestion(51);
							}}
						>
							50
						</button>
					</div>
				</div>
			</div>
		);
	}
	// the actual quiz part
	if (questionNumber !== maxQuestion) {
		return (
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div className="card quiz__card">
					<div className="quiz__heading">
						<h1 className="quiz__header montserrat">{`Round ${questionNumber}`}</h1>
						<span className="quiz__subheader">{`Current score: ${score}`}</span>
					</div>
					<img
						src={`https://api.fern.fun/flagathon/flags/${
							countriesCodes[questions[number]]
						}/`}
						className="quiz__flag"
						alt={`flag`}
					/>

					<div className="quiz__buttons">
						{answer[questionNumber - 1]?.map((answer) => {
							return answer == questions[number] ? (
								<button
									onClick={(event) => {
										return pastUserAnswers[number] != undefined
											? nextFlag()
											: correct(event);
									}}
									key={answer}
									className={`button 
										${pastUserAnswers[number] != undefined ? "correct" : ""}
									`}
								>
									{countries[answer]}
								</button>
							) : (
								<button
									onClick={(event) => {
										return pastUserAnswers[number] != undefined
											? nextFlag()
											: incorrect(event);
									}}
									key={answer}
									className={`button 
										${pastUserAnswers[number] != undefined ? "incorrect" : ""}
									`}
								>
									{countries[answer]}
								</button>
							);
						})}
					</div>
				</div>
				<div className="quiz__nav">
					<button onClick={previousFlag} className="button outline">
						Previous
					</button>
					{pastUserAnswers[number] != undefined ? (
						<button onClick={nextFlag} className="button outline">
							Next
						</button>
					) : null}
				</div>
			</div>
		);
	}
	// page with the score
	else if (questionNumber >= maxQuestion) {
		return (
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div className="card card__flex montserrat">
					<div className="card__heading">
						<h1 className="card__header">Score</h1>
					</div>
					<div className="card__content">
						<span>Your score: {score}</span>
					</div>

					<div className="card__buttons">
						<button onClick={playAgain} className="button">
							Play again
						</button>
					</div>
					<div className="card__content">
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								cursor: "pointer"
							}}
							onClick={() => {
								setExpanded(!expanded);
							}}
						>
							<h2 className="color">Your answers</h2>
							<h2 className="icon color">
								{expanded ? "expand_more" : "expand_less"}
							</h2>
						</div>
						<div className={`answers${expanded ? "" : " answers__hidden"}`}>
							{pastUserAnswers.map((answer, index) => {
								return (
									<div className="quiz__answer">
										<h3 className="color" style={{ display: "flex" }}>
											Question number {index + 1} |
											{answer[1] === true ? (
												<h3 className="icon" style={{ color: "#7ae070" }}>
													done
												</h3>
											) : (
												<h3 className="icon" style={{ color: "#e86868" }}>
													close
												</h3>
											)}
										</h3>
										{answer[1] === false ? (
											<span>
												<b>Correct answer: </b>
												{countries[pastCorrectAnswers[index]]}
											</span>
										) : null}
									</div>
								);
							})}
						</div>
					</div>
				</div>

				<div className="quiz__nav">
					<button onClick={previousFlag} className="button outline">
						Previous
					</button>
					{pastUserAnswers[number] != undefined ? (
						<button onClick={nextFlag} className="button outline">
							Next
						</button>
					) : null}
				</div>
			</div>
		);
	}
}
