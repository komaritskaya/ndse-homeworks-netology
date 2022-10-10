const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");
const { Message, SecretNumber, EXIT_INPUT } = require('./const');
const { getSecretNumber, showLoseMessage, showWinMessage, showFinishMessage } = require('./utils');

const createLogFile = (readLineInterface) => {
    return new Promise((resolve) => {
        readLineInterface.question(Message.FILE_REQUEST, async (input) => {
            if (!input) {
                console.log(Message.FILE_EMPTY);
                process.exit(1);
            }

            const logFile = `${input}.json`;
            const exists = await fsExtra.pathExists(path.join(__dirname, logFile));

            if (exists) {
                console.log(Message.FILE_EXISTS);
                process.exit(1);
            }

            resolve(path.join(__dirname, logFile));
        });
    });
};

const startGame = async (readLineInterface) => {
    let gameIndex = 0;
    let result = [];

    console.log(Message.WELCOME_TEXT);

    const logFile = await createLogFile(readLineInterface);
    const writerSrt = fs.createWriteStream(logFile);

    console.log(Message.QUESTION);

    writerSrt.on('finish', () => {
        showFinishMessage(logFile);
    });
    
    readLineInterface.on('line', (input) => {
        const secretNumber = getSecretNumber();

        if (input.toLowerCase() === EXIT_INPUT.toLowerCase()) {
            writerSrt.write(JSON.stringify(result));
            writerSrt.end();
            readLineInterface.close();
        } else if (input !== SecretNumber.HEADS.toString() && input !== SecretNumber.TAILS.toString()) {
            console.log(Message.INVALID_ANSWER);
        } else if (input === secretNumber.toString()) {
            showWinMessage(secretNumber);
            result.push({
                gameIndex,
                secretNumber,
                won: true
            });
            gameIndex++;
        } else {
            showLoseMessage(secretNumber);
            result.push({
                gameIndex,
                secretNumber,
                won: false
            });
            gameIndex++;
        }
    });
};

module.exports = {
    startGame
};