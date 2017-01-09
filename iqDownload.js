//
// node iqDownload.js
//  download intraday 1d
//
var exec = require('child_process').execSync;
var tickersArray = require('./src/data/tickersArray.json');
var inverseTickersArray = require('./src/data/inverseTickersArray.json');
var tickers = tickersArray.concat(inverseTickersArray);

const wget = '/cygwin64/bin/wget';
const csvFolder = 'src/data/csv';

var tsStart = (new Date().toISOString());
tickers.forEach((ticker) => {
    var url = `http://chartapi.finance.yahoo.com/instrument/1.0/${ticker}/chartdata;type=quote;range=1d/csv`;
    var wgetCmd = `${wget} "${url}" -O ${csvFolder}/${ticker}_1d.csv`;
    // console.log(wgetCmd);
    exec(wgetCmd);
    // exec(wgetCmd, function(error, stdout, stderr) {
    //     // console.log(stdout);
    //     console.log(`${ticker} done`)
    // });
});
console.log(tsStart);
console.log(new Date().toISOString());
