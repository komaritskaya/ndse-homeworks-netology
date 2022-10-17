#!/usr/bin/env node
const http = require('http');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { Message, getSuccessMessage, getErrorMessage } = require('./const');
const { URL, API_KEY } = require('./config.js');

const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

if (!process.env.URL || !process.env.API_KEY) {
    if (fs.existsSync(path.join(__dirname, 'config.js'))) {
        process.env = { ...process.env, URL, API_KEY };
    } else {
        console.error(Message.NO_ENV_VARS);
        process.exit(1);
    }
}

const getCity = () => {
    return new Promise((resolve) => {
        readLineInterface.question(Message.WELCOME_TEXT, async (input) => {
            if (!input) {
                console.log(Message.NO_CITY);
                process.exit(1);
            }

            resolve(input.trim());
        });
    });
};

const getWeather = async () => {
    const city = await getCity();
    const url = `${process.env.URL}?access_key=${process.env.API_KEY}&query=${city}`;

    await http.get(url, (res) => {
        if (res.statusCode !== 200) {
            console.error(getErrorMessage(statusCode));
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => (rawData += chunk));
        res.on('end', () => {
            let parsedData = JSON.parse(rawData);
            if (parsedData.error) {
                console.log(Message.UNKNOWN_ERROR);
                console.log(parsedData);
            } else {
                console.log(getSuccessMessage(city));
                console.log(parsedData.current);
            }
            process.exit(0);
        });
    });
};

getWeather();