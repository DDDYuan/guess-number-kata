"use strict";

const ERROR_MESSAGE = "Wrong Input，Input again";

require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', function (line) {
    if (!verifyInput(line)) {
        console.log(ERROR_MESSAGE);
    } else {
        console.log("0A0B");
    }
});

function verifyInput(input) {
    if (new Set(input.split(" ")).size == 4) {
        return input.split(" ").every(num => {
            var number = parseInt(num);
            return number >= 0 && number <= 9;
        });
    }
    return false;
}