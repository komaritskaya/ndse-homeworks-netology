const { SecretNumber } = require("./const");

module.exports = {
    getSecretNumber:() => Math.random() < 0.5 ? SecretNumber.HEADS : SecretNumber.TAILS,

    showWinMessage: (secretNumber) => {
        console.log(`Верно! Загадано число ${secretNumber}.`);
    },

    showLoseMessage: (secretNumber) => {
        console.log(`Неверно! Загадано число ${secretNumber}.`);
    },

    showFinishMessage: (logFile) => {
        console.log(`Спасибо за игру! Результаты можно найти в файле ${logFile}.`);
    },
};
