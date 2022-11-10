#!/usr/bin/env node
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = require('yargs/yargs')(process.argv.slice(2))
    .option('out', {
        alias: 'o',
        describe: 'path to log file',
    })
    .argv;

let cachePath = '';

function run() {
    console.log('Выберите сторону \n 1: Орел \n 2: Решка \n');
    process.stdin.on('data', (ch) => {
        console.log('Выберите сторону \n 1: Орел \n 2: Решка \n');
        let answer = ch.toString() === 1 ? 'Орел' : 'Решка'
        let result = Math.floor(Math.random() * 2) === 0 ? 'Орел' : 'Решка';
        logger(answer === result)
        console.log((answer === result ? 'Позравляю вы угадали' : 'К сожаление вы проиграли')
            + ' \n Ответ компьютера был: '
            + result
            + ' \n Ваш ответ был: '
            + answer
            + "\n\n\n\n\n\n")
    });
}

function logger(gameResult) {
    let obj = readCache();
    obj.steps++;
    if (gameResult == true) {
        obj.wins++;
    } else {
        obj.loose++;
    }
    fs.writeFile(cachePath, JSON.stringify(obj), err => err ? console.error(err) : null);
}

function readCache() {
    if (!fs.existsSync(cachePath)) fs.writeFileSync(cachePath, JSON.stringify({ steps: 0, wins: 0, loose: 0 }));
    let data = JSON.parse(fs.readFileSync(cachePath));
    return data;
}

if (argv.out) {
    cachePath = argv.out;
}

run();