//
// robot.js
//
const http = require('http');

//var url = `http://real-chart.finance.yahoo.com/table.csv?s=${ticker}&a=00&b=1&c=${today[2]-1}&d=${today[0]-1}&e=${today[1]}&f=${today[2]}&g=d&ignore=.csv`;
//http://www.google.com/finance/historical?cid=657540&startdate=Jan+1%2C+2015&enddate=Mar+6%2C+2016&num=30&ei=e5fcVrmOA9WyjAGe-r6QBA&output=csv

module.exports = (ticker) => {

  // historical from 1/1 last year to today
  var today = new Date().toLocaleString().split(',')[0].split('/');
  var yahoo = `http://real-chart.finance.yahoo.com/table.csv?s=${ticker}&a=00&b=1&c=${today[2]-1}&d=${today[0]-1}&e=${today[1]}&f=${today[2]}&g=d&ignore=.csv`;
  var yahooIntraday1d = `http://chartapi.finance.yahoo.com/instrument/1.0/${ticker}/chartdata;type=quote;range=1d/csv`;
  //var google = `http://www.google.com/finance/historical?startdate=Jan 1,2015&enddate=Mar 6,2016&output=csv`;
  var data = '';

  function robot(url, callback) {

        data = '';

        http.get(url, (res) => {

            // console.log(`Got response: ${res.statusCode} for ${ticker}`);

            // consume response body
            res.on('data', (chunk) => {
                data += chunk;
            });
            // end of response body
            res.on('end', () => {
                //console.log(data);
                //parser();
                callback(data);
            });

            res.resume();
        }).on('error', (e) => {
            console.log(`Got error: ${e.message}`);
            callback(false);
        });
  }
  function parser() {
        var lines = data.split('\n');
        var headers = lines[0].split(',');
        console.log(headers);
  }
  return {
    hqUri: yahoo,
    tst: () => { parser(); },
    // historyQ: () => data
    historyQ: (callback) => { robot(yahoo, callback); },
    intraday1d: (callback) => { robot(yahooIntraday1d, callback); }
  }
}
