import { Injectable } from '@angular/core';
import { Observable, Observer  } from 'rxjs/RX';
// import { Observable  } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';
import { WsCommand, WsInterace } from '../models/iq.model';

@Injectable()

export class WsService {
    wsProxy: WebSocket;
    hqUrl: string;

    constructor() {
        this.wsProxy = new WebSocket("ws://localhost:3030");
        console.log('WebSocket created ...')

        // calculate hq start date
        let date1 = new Date();
        let today = date1.toLocaleString().split(',')[0].split('/');
        let startYear= +today[2];
        let date2 = new Date("1/1/" + startYear);
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays < 300) startYear --;
        this.hqUrl = `http://real-chart.finance.yahoo.com/table.csv?s={ticker}&a=00&b=1&c=${startYear}&d=${+today[0]-1}&e=${today[1]}&f=${today[2]}&g=d&ignore=.csv`;
    }
    iqProxy(ticker): Observable<any> {
        let url = `http://chartapi.finance.yahoo.com/instrument/1.0/${ticker}/chartdata;type=quote;range=1d/csv`;
        return Observable.create((observer: Observer<string>) => {
                // this.wsProxy.onopen = (event) => {
                //     this.wsProxy.send(url);
                // };
                this.wsProxy.send(url);
                this.wsProxy.onmessage = (message) => {
                    observer.next(message.data);
                };
        });
    }
    hqWsProxy(ticker): Observable<any> {
        return Observable.create((observer: Observer<string>) => {
                this.wsProxy.send(this.hqUrl.replace('{ticker}', ticker));
                this.wsProxy.onmessage = (message) => {
                    observer.next(message.data);
                };
        });
    }
    hqProxy(ticker): Observable<any> {
        return Observable.create((observer: Observer<string>) => {
                const ws = new WebSocket("ws://localhost:3030");
                ws.onopen = (event) => {
                    ws.send(this.hqUrl.replace('{ticker}', ticker));
                };
                ws.onmessage = (message) => {
                    observer.next(message.data);
                };
        });
    }
    rxjsWebSocketSubject(ticker) {
        let url = `http://chartapi.finance.yahoo.com/instrument/1.0/${ticker}/chartdata;type=quote;range=1d/csv`;
        let subject = Observable.webSocket("ws://localhost:3030");
        subject.subscribe(
            (msg) => console.log('message received: ' + msg),
            (err) => console.log(err),
            () => console.log('complete')
        );
        subject.next(url);
    }
    wsStream() {
        const wsInterface: Observable<WsInterace>
            = Observable.create((observer: Observer<WsInterace>) => {
                const ws = new WebSocket("ws://localhost:3030");
                ws.addEventListener("message", (message) => {
                    // console.log(parseInt(message.data, 10));
                    observer.next(message.data);
            });
        });
        wsInterface
            // .map((num) => num * 2)
            // .filter((num) => num > 20)
            .subscribe((num) => console.log(num));
    }
    async_observable_samples(tst) {

        // Observable.fromEvent(document.querySelector("button"), "click")
        // .subscribe(() => {
        //     console.log("button clicked");
        // })
        const numbers: Observable<number>
            = Observable.create((observer: Observer<number>) => {
                const ws = new WebSocket("ws://localhost:3030");
                ws.addEventListener("message", (message) => {
                    // console.log(parseInt(message.data, 10));
                    observer.next(parseInt(message.data, 10));
            });
        });
        numbers
            // .map((num) => num * 2)
            // .filter((num) => num > 20)
            .subscribe((num) => console.log(tst + '-->' + num));
    }
}