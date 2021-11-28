import React, { useEffect, useState } from "react";
import * as data from "./codes.json";

export default function Quiz() {
  // Question number tracker
  const [questionNumber, setQuestionNumber] = useState(1);
  // Max question
  const [maxQuestion, setMaxQuestion] = useState(6);
  // All countries of the world
  const countries = Object.values(data.default);
  // ISO3166 codes of the countries
  const countriesCodes = Object.keys(data.default);
  // 5 random countries serving as questions
  const [questions, setQuestions] = useState([
    Math.floor(Math.random() * countries.length),
    Math.floor(Math.random() * countries.length),
    Math.floor(Math.random() * countries.length),
    Math.floor(Math.random() * countries.length),
    Math.floor(Math.random() * countries.length),
  ]);
  // User score
  const [score, setScore] = useState(0);
  // Current number (country code) of current country
  const [number, setNumber] = useState(0);

  const flagStyle = {
    height: "100px",
  };

  // next question
  const nextFlag = () => {
    if (number !== countries.length - 1 && questionNumber < maxQuestion) {
      setNumber((number) => number + 1);
      setQuestionNumber((questionNumber) => questionNumber + 1);
    }
  };
  // previos question
  const previousFlag = () => {
    if (number !== 0) {
      setNumber((number) => number - 1);
      setQuestionNumber((questionNumber) => questionNumber - 1);
    }
  };
  // When user checks correct answer
  const correct = () => {
    setScore((score) => score + 1);
    nextFlag();
  };
  // When user checks wrong answer
  const incorrect = () => {
    nextFlag();
  };
  //Play again
  const playAgain = () => {
    setScore(0);
    setQuestionNumber(1);
    setNumber(0);
    setQuestions([
      Math.floor(Math.random() * countries.length),
      Math.floor(Math.random() * countries.length),
      Math.floor(Math.random() * countries.length),
      Math.floor(Math.random() * countries.length),
      Math.floor(Math.random() * countries.length),
    ]);
  };

  // generated random answers
  const anwser = [];
  for (let a = 0; a < 4; a++)
    anwser.push(
      <button onClick={incorrect}>
        {countries[Math.floor(Math.random() * countries.length)]}
      </button>
    );
  // mixing the answer with the fake answers
  anwser[Math.floor(Math.random() * anwser.length)] = (
    <button onClick={correct}>{countries[questions[number]]}</button>
  );

  if (questionNumber !== maxQuestion) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>Question number: {questionNumber}</span>
        <button onClick={previousFlag}>Previous</button>
        <button onClick={nextFlag}>Next</button>
        <span>
          <img
            src={`https://api.fern.fun/flagathon/flags/${
              countriesCodes[questions[number]]
            }/`}
            style={flagStyle}
            alt={`${countries[questions[number]]} flag`}
          />
        </span>
        {anwser}
      </div>
    );
  } else if (questionNumber === maxQuestion) {
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
