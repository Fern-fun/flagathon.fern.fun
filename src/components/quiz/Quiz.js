import React, { useEffect, useState, useRef } from "react";
import * as data from "./codes.json";

export default function Quiz() {
	// function returning random number
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
		event.target.style.backgroundColor = "green";
		// increases the score by 1
		setScore((score) => score + 1);
		// after 500ms the button color is set back to default and next question is displayed
		setTimeout(() => {
			nextFlag();
			event.target.style.backgroundColor = "initial";
		}, 500);
	};

	// When user checks wrong answer
	const incorrect = (event) => {
		event.target.style.backgroundColor = "red";
		setTimeout(() => {
			nextFlag();
			event.target.style.backgroundColor = "initial";
		}, 500);
	};

	// styles for the flag
	const flagStyle = {
		height: "100px"
	};

	//Play again, resets all variables to their initial state and generates new questions
	const playAgain = () => {
		setScore(0);
		setMaxQuestion(null);
		setQuestionNumber(1);
		setNumber(0);
		setQuestions([]);
		generateQuestions();
	};

	// the first page to choose the number of questions
	if (maxQuestion == null) {
		return (
			<div style={{ display: "flex", flexDirection: "column" }}>
				<span>Please enter the number of questions you want to answer</span>
				<button
					onClick={() => {
						setMaxQuestion(6);
					}}
				>
					5
				</button>
				<button
					onClick={() => {
						setMaxQuestion(11);
					}}
				>
					10
				</button>
				<button
					onClick={() => {
						setMaxQuestion(21);
					}}
				>
					20
				</button>
				<button
					onClick={() => {
						setMaxQuestion(51);
					}}
				>
					50
				</button>
			</div>
		);
	}
	// the actual quiz part
	if (questionNumber !== maxQuestion) {
		return (
			<div style={{ display: "flex", flexDirection: "column" }}>
				<span>
					Question number: {questionNumber}, Current score: {score}
				</span>
				<button onClick={previousFlag}>Previous</button>
				<button onClick={nextFlag}>Next</button>
				<span>
					<img
						src={`https://api.fern.fun/flagathon/flags/${
							countriesCodes[questions[number]]
						}/`}
						style={flagStyle}
						alt={`flag ${countries[questions[number]]}`}
					/>
				</span>
				{answer[questionNumber - 1]?.map((answer, index) => {
					return answer == questions[number] ? (
						<button onClick={correct}>{countries[answer]}</button>
					) : (
						<button onClick={incorrect}>{countries[answer]}</button>
					);
				})}
			</div>
		);
	}
	// page with the score
	else if (questionNumber === maxQuestion) {
		return (
			<div style={{ display: "flex", flexDirection: "column" }}>
				<span>Score</span>
				<button onClick={previousFlag}>Previous</button>
				<button onClick={nextFlag}>Next</button>
				<span>Your score is {score}</span>
				<button onClick={playAgain}>Play again</button>
			</div>
		);
	}
}
