const fsExtra = require("fs-extra");
const fsPromises = require("fs/promises");
const path = require("path");
const { Message } = require("./const");
const { showStatsMessage } = require("./utils");

const findLogFile = (readLineInterface) => {
    return new Promise((resolve) => {
        readLineInterface.question(Message.FILE_SEARCH_REQUEST, async (input) => {
            if (!input) {
                console.log(Message.FILE_EMPTY);
                process.exit(1);
            }

            const logFile = `${input}.json`;
            const exists = await fsExtra.pathExists(path.join(__dirname, logFile));

            if (!exists) {
                console.log(Message.FILE_NOT_FOUND);
                process.exit(1);
            }

            resolve(path.join(__dirname, logFile));
        });
    });
};

const getStats = async (readLineInterface) => {
  const filePath = await findLogFile(readLineInterface);
  readLineInterface.close();

  const data = await fsPromises.readFile(filePath, "utf-8");
  const parsedData = JSON.parse(data);

  showStatsMessage(parsedData);
};

module.exports = {
    getStats
};