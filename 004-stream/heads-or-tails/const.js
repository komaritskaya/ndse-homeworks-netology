module.exports = {
    EXIT_INPUT: 'exit',

    SecretNumber: {
        HEADS: 1,
        TAILS: 2
    },

    Message: {
        WELCOME_TEXT: `
            Давай поиграем в игру "Орёл и Решка"!\n
            В ходе игры необходимо выбрать одно значение из двух: 1 (=орёл) или 2 (=решка).\n
            Можно выйти из игры в любой момент, набрав 'exit'.\n
        `,
        FILE_REQUEST: 'Пожалуйста, укажи название файла для записи результатов: ',
        FILE_SEARCH_REQUEST: 'Пожалуйста, укажи название файла (без расширения) для разбора игры: ',
        FILE_EMPTY: 'Имя файла не может быть пустым! Попробуй еще раз.',
        FILE_EXISTS: 'Такой файл уже есть! Попробуй еще раз.',
        FILE_NOT_FOUND: 'Файл не найден! Попробуй еще раз.',
        QUESTION: 'Выбирай числа 1 или 2 ниже:\n',
        INVALID_ANSWER: 'Некорректный ввод. Нужно выбрать число 1 или 2!',
    }
};

