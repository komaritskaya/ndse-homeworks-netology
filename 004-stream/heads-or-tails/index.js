#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const readline = require('readline');
const { startGame } = require('./game');
const { getStats } = require('./stats');

const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const argv = yargs(hideBin(process.argv))
    .command(
        '$0',
        'play the heads-and-tails game',
        function () {},
        function () {
            startGame(readLineInterface);
        }
    )
    .command(
        'stats',
        'see the game statistics',
        function () {},
        function () {
            getStats(readLineInterface);
        }
    )
    .help()
    .argv;
