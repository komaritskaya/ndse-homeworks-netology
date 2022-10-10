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

    showStatsMessage: (data) => {
        const numberOfGames = data.length;
        const wonGames = data.filter(game => game.won).length;
        const lostGames = data.filter(game => !game.won).length;
        const percentWon = ((wonGames / numberOfGames) * 100).toFixed(2);
        const percentLost = ((lostGames / numberOfGames) * 100).toFixed(2);
        console.log(`
            Всего партий:  ${numberOfGames}\n
            Выиграно:      ${wonGames}\n
            Проиграно:     ${lostGames}\n
            % выигранных:  ${percentWon}%\n
            % проигранных: ${percentLost}%\n
        `);
    }
};
