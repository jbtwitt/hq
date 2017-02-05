const ws = require('ws');   //websocket
const robot = require('./robot');

const wsPort = 3030;

const wss = new ws.Server({
	port: wsPort
}, () => {
	console.log(`web socket server started on port ${wsPort}`);
});

wss.on('connection', ws => {
	console.log(`-->web socket connection opened on port ${wsPort}`);
	ws.on('close', () => {
		console.log(`web socket connection closed on port ${wsPort}`);
	});
	ws.on('message', (url) => {
        console.log('->' + url)
        robot().proxy(url, (response) => {
            // console.log(response);
            ws.send(response);
        });
    });
});