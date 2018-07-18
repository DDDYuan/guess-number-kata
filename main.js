"use strict";

const ERROR_MESSAGE = "Wrong Input，Input again";
const answer = generateAnswer();
const history = [];
let chances = 6;

require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', function (line) {
    guessNumberProcess(line);
});

function guessNumberProcess(line) {
    const input = line.split(" ");
    if (!verifyInput(input)) {
        console.log(ERROR_MESSAGE);
    } else {
        const result = checkAnswer(input);
        const resultStr = `${result.A}A${result.B}B`;
        history.push({
            guess: line,
            result: resultStr
        });
        console.log(resultStr);
        showHistory();
        chances--;
        if (chances === 0 || result.A === 4) {
            console.log(`Game over.`);
            process.exit();
        }
    }
}

function showHistory() {
    if (history.length > 0) {
        console.log(`History:\n`);
        history.forEach(
            guess => console.log(`Guess: ${guess.guess} Result: ${guess.result}`)
        );
        console.log(`\n`);

    }
}

function verifyInput(input) {
    if (new Set(input).size == 4) {
        return input.every(num => {
            const number = parseInt(num);
            return number >= 0 && number <= 9;
        });
    }
    return false;
}

function generateAnswer() {
    const generated = [];
    while (generated.length < 4) {
        const random = ~~(Math.random() * 10);
        if (!generated.includes(random)) {
            generated.push(random);
        }
    }
    return generated;
}

function checkAnswer(input) {
    const inputNumbers = input.map(num => parseInt(num));
    let correctPostion = 0;
    let correctNumber = 0;

    answer.forEach(
        answerNum => inputNumbers.forEach(
            inputNum => {
                if (answerNum === inputNum) {
                    if (answer.indexOf(answerNum) === inputNumbers.indexOf(inputNum)) {
                        correctPostion++;
                    } else {
                        correctNumber++;
                    }
                }
            }
        )
    );

    return {
        A: correctPostion,
        B: correctNumber
    }
};