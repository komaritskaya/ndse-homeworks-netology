#!/usr/bin/env node
const readline = require('readline');
const { getRandomNumber } = require('./utils');

const MAX_NUMBER = 100;

const welcomeText = `Загадано число в диапазоне от 0 до ${MAX_NUMBER}`;

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const showWinMessage = (secretNumber) => {
  console.log(`Отгадано число ${secretNumber}`);

  readLineInterface.close();
};

const checkAnswer = (secretNumber) => {
  readLineInterface.question('Ваш ответ: ', (inputNumber) => {
    const userAnswer = Number.parseInt(inputNumber);

    if (secretNumber === userAnswer) {
      return showWinMessage(secretNumber);
    }

    if (secretNumber > userAnswer) {
        console.log('Больше');
    } else {
        console.log('Меньше');
    }
    checkAnswer(secretNumber);
  });
};

const startGame = () => {
    console.log(welcomeText);

    const myNumber = getRandomNumber(0, Number.parseInt(MAX_NUMBER, 10));
    checkAnswer(myNumber);
};

startGame();