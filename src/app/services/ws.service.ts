import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()

export class WsService {
    ws: WebSocket;

    constructor() {
        this.ws = new WebSocket("ws://localhost:3030");
        console.log('WebSocket created ...')
        const data: Observable<string>
            = Observable.create((observer: Observer<number>) => {
                // const ws = new WebSocket("ws://localhost:3030");
                this.ws.addEventListener("message", (message) => {
                    // console.log(parseInt(message.data, 10));
                    observer.next(message.data);
            });
        });
        data
            // .map((num) => num * 2)
            // .filter((num) => num > 20)
            .subscribe((s) => console.log('--->' + s));
    }

    getIq(ticker) {
        let cmd: any = {
            type: 'iq',
            ticker: ticker
        };
        this.ws.send(JSON.stringify(cmd));
    }
    async_observable_samples() {

        // Observable.fromEvent(document.querySelector("button"), "click")
        // .subscribe(() => {
        //     console.log("button clicked");
        // })
        const numbers: Observable<number>
            = Observable.create((observer: Observer<number>) => {
                // const ws = new WebSocket("ws://localhost:3030");
                this.ws.addEventListener("message", (message) => {
                    // console.log(parseInt(message.data, 10));
                    observer.next(parseInt(message.data, 10));
            });
        });
        let total = 0;
        numbers
            // .map((num) => num * 2)
            // .filter((num) => num > 20)
            .subscribe((num) => console.log(num));
    }
}