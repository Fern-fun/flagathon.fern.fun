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

// function to generate random questions
export const generateQuestions = (maxQuestion, countries) => {
	const questions1 = [];
	for (let i = 0; i < maxQuestion - 1; i++) {
		const randomNumber = random(0, countries.length - 1);
		if (questions1.indexOf(randomNumber) === -1) {
			// console.log(i);
			questions1.push(randomNumber);
		} else {
			i--;
		}
	}

	const answersGlobal = [];
	for (let j = 0; j < maxQuestion - 1; j++) {
		const answers = [];
		for (let i = 0; i < 4; i++) {
			const randomNumber = random(0, countries.length - 1);
			if (answers.indexOf(randomNumber) === -1) {
				if (i === 3) {
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
	return { questions: questions1, answers: answersGlobal };
};
