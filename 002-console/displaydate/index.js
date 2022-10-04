#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const currentDate = new Date();

const argv = yargs(hideBin(process.argv))
    .command(
        'current',
        'show current date/time',
        function (yargs) {
            return yargs
                .option('year', {
                    alias: 'y',
                    type: 'boolean',
                    description: 'show current year'
                })
                .option('month', {
                    alias: 'm',
                    type: 'boolean',
                    description: 'show current month',
                })
                .option('date', {
                    alias: 'd',
                    type: 'boolean',
                    description: 'show current date',
                })
        },
        function (argv) {
            if (!argv.year && !argv.month && !argv.date) {
                console.log(currentDate.toISOString());
            }
        
            if (argv.year) {
                console.log(currentDate.getFullYear());
            }
            if (argv.month) {
                console.log(currentDate.getMonth());
            }
            if (argv.date) {
                console.log(currentDate.getDate());
            }
        }
    )
    .command(
        'add',
        'add n years/months/days to current date',
        function (yargs) {
            return yargs
                .option('year', {
                    alias: 'y',
                    type: 'number',
                    description: 'add years'
                })
                .option('month', {
                    alias: 'm',
                    type: 'number',
                    description: 'add months',
                })
                .option('date', {
                    alias: 'd',
                    type: 'number',
                    description: 'add days',
                })
        },
        function (argv) {
            if (!argv.year && !argv.month && !argv.date) {
                console.log('Please specify period to add');
            }
            
            if (argv.year) {
                console.log(new Date(currentDate.setFullYear(currentDate.getFullYear() + argv.year)).toISOString());
            }
            if (argv.month) {
                console.log(new Date(currentDate.setMonth(currentDate.getMonth() + argv.month)).toISOString());
            }
            if (argv.date) {
                console.log(new Date(currentDate.setDate(currentDate.getDate() + argv.date)).toISOString());
            }
        }
    )
    .command(
        'sub',
        'subtract n years/months/days from current date',
        function (yargs) {
            return yargs
                .option('year', {
                    alias: 'y',
                    type: 'number',
                    description: 'subtract years'
                })
                .option('month', {
                    alias: 'm',
                    type: 'number',
                    description: 'subtract months',
                })
                .option('date', {
                    alias: 'd',
                    type: 'number',
                    description: 'subtract days',
                })
        },
        function (argv) {
            if (!argv.year && !argv.month && !argv.date) {
                console.log('Please specify period to subtract');
            }
            
            if (argv.year) {
                console.log(new Date(currentDate.setFullYear(currentDate.getFullYear() - argv.year)).toISOString());
            }
            if (argv.month) {
                console.log(new Date(currentDate.setMonth(currentDate.getMonth() - argv.month)).toISOString());
            }
            if (argv.date) {
                console.log(new Date(currentDate.setDate(currentDate.getDate() - argv.date)).toISOString());
            }
        }
    )
    .help()
    .argv;
