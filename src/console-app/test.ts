///<reference path="../../node_modules/angular-cli/node_modules/tslint/typings/node/node.d.ts" />

// import readline = require('readline');
// import stream = require('stream');

// class ReadLineOptions implements readline.ReadLineOptions {
//     constructor(public input: stream.ReadableStream, public output: stream.WritableStream) { }
// }

// var options = new ReadLineOptions(process.stdin, process.stdout);

// var rl = readline.createInterface(options);
// rl.question('What is your name? ', name => {
//     console.log('Hi ' + name + '!');
//     rl.question('press enter to exit', () => rl.close());

import { Hq, HqTicker } from '../app/models/hq.model';

//
// node hqDownload.js
//
var exec = require('child_process').execSync;

var tickersArray = require('../data/tickersArray.json');
var inverseTickersArray = require('../data/inverseTickersArray.json');
var tickers = tickersArray.concat(inverseTickersArray);

const wget = '/cygwin64/bin/wget';
const csvFolder = '../data/csv';

// calculate start date
var date1 = new Date();
var today = date1.toLocaleString().split(',')[0].split('/');
var startYear= +today[2];
var date2 = new Date("1/1/" + startYear);
var timeDiff = Math.abs(date2.getTime() - date1.getTime());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
if (diffDays < 300) startYear --;


var tsStart = (new Date().toISOString());
tickers.forEach((ticker) => {
    var url = `http://real-chart.finance.yahoo.com/table.csv?s=${ticker}&a=00&b=1&c=${startYear}&d=${today[0]-1}&e=${today[1]}&f=${today[2]}&g=d&ignore=.csv`;
    var wgetCmd = `${wget} "${url}" -O ${csvFolder}/${ticker}.csv`;
    // console.log(wgetCmd);
    exec(wgetCmd);
    // exec(wgetCmd, function(error, stdout, stderr) {
    //     // console.log(stdout);
    //     console.log(`${ticker} done`)
    // });
});
console.log(tsStart);
console.log(new Date().toISOString());
