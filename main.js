"use strict";

const ERROR_MESSAGE = "Wrong Input，Input again";
const answer = generateAnswer();
let chances = 6;

require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', function (line) {
    guessNumberProcess(line);
});

function guessNumberProcess(line) {
    const input = line.split(" ");
    let end = false;
    if (!verifyInput(input)) {
        console.log(ERROR_MESSAGE);
    } else {
        const result = checkAnswer(input);
        console.log(`${result.A}A${result.B}B`);
        chances--;
        if (chances === 0 || result.A === 4) {
            end = true;
        }
    }
    if (end) {
        console.log("Game over.");
        process.exit();
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