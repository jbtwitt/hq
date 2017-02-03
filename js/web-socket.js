const ws = require('ws');   //websocket
const robot = require('./robot');

const wsPort = 3030;

const wss = new ws.Server({
	port: wsPort
}, () => {
	console.log(`web socket server started on port ${wsPort}`);
});

wss.on('connection', ws => {

	console.log(`web socket connection opened on port ${wsPort}`);

	let counter = 0;
	let handle;

	ws.on('close', () => {
		console.log(`web socket connection closed on port ${wsPort}`);
		clearInterval(handle);
	});
	ws.on('message', (message) => {
        // console.log('received message-> ' + message)
        let cmd = JSON.parse(message);
        console.log(cmd);
        robot(cmd.ticker).intraday1d((csvData) => {
            // console.log(csvData);
            ws.send(csvData);
        });
    });
	// handle = setInterval(() => {
	// 	ws.send(JSON.stringify(counter++));
	// }, 5000);

});


/*
const robot = require('./robot');
let ticker = "SVA";

// robot(ticker).historyQ((csvData) => {
robot(ticker).intraday1d((csvData) => {
    console.log(csvData);
});

const http = require('http');
// http.get(url, (response) => {
//     response.pipe();
// })

const Rx = require('rxjs');

// Create new observable
const one = Rx.Observable.of(1,2,3);

let myObserver = {
    next: x => console.log(x),
    error: e => console.error(e),
    complete: () => console.log('complete')
}
let myObserver2 = {
    next: x => console.log("2->"+x),
    error: e => console.error(e),
    complete: () => console.log("2->"+'complete')
}
// Subscribe to it
const oneSubscription = one.subscribe(myObserver);
const oneSubscription2 = one.subscribe(myObserver);

// "Dispose"/unsubscribe from it
oneSubscription.unsubscribe();
oneSubscription2.unsubscribe();
*/