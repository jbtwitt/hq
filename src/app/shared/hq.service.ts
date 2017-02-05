import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Hq, HqTicker } from '../models/hq.model';
import { HqUtils } from '../shared/hq-utils';
import { WsService } from '../services/ws.service';

@Injectable()

export class HqDataService {

    private _lookupDataUrl = '';//CONFIG.baseUrls.lookupServices;
    //var google = `http://www.google.com/finance/historical?startdate=Jan 1,2015&enddate=Mar 6,2016&output=csv`;

    constructor(
        private wsService: WsService,
        private _http: Http) { }

    getHqTicker(ticker: string): Promise<HqTicker> {
        return new Promise((resolve, reject) => {
            // this.getCsv(ticker) // get HQ csv
            this.wsService.hqProxy(ticker)
                .subscribe(csv => {
                    let hqTicker = new HqTicker(ticker);
                    hqTicker.csv = csv;
                    hqTicker.hqs = HqUtils.parseHqCsv(csv);
                    let sortHqs = HqUtils.hqSortByClose(hqTicker.hqs);
                    hqTicker.hqMinIndex  = hqTicker.hqs.findIndex((hq: Hq) => hq.date == sortHqs[0].date);
                    hqTicker.hqMaxIndex  = hqTicker.hqs.findIndex((hq: Hq) => hq.date == sortHqs[hqTicker.hqs.length-1].date);
                    return resolve(hqTicker);
                });
            });
        // return new Promise((resolve, reject) => {
        //     this.getData(jsonFilename)
        //     .subscribe(data => {
        //         let hqTickers: HqTicker[] = new Array<HqTicker>();
        //         data.forEach(ticker => {
        //             let hqTicker = new HqTicker(ticker);
        //             this.getCsv(ticker) // get HQ csv
        //                 .subscribe(csv => {
        //                     hqTicker.csv = csv;
        //                     hqTicker.hqs = HqUtils.parseHqCsv(csv);
        //                     let sortHqs = HqUtils.hqSortByClose(hqTicker.hqs);
        //                     hqTicker.hqMinIndex  = hqTicker.hqs.findIndex((hq: Hq) => hq.date == sortHqs[0].date);
        //                     hqTicker.hqMaxIndex  = hqTicker.hqs.findIndex((hq: Hq) => hq.date == sortHqs[hqTicker.hqs.length-1].date);
        //                     hqTickers.push(hqTicker);
        //                 });
        //             });
        //         return resolve(hqTickers);
        //     });
        // });
    }
    getHqTickers(jsonFilename: string): Promise<HqTicker[]> {
        return new Promise((resolve, reject) => {
            this.getData(jsonFilename)
            .subscribe(data => {
                let hqTickers: HqTicker[] = new Array<HqTicker>();
                data.forEach(ticker => {
                    let hqTicker = new HqTicker(ticker);
                    // this.getCsv(ticker) // get HQ csv
                    this.wsService.hqProxy(ticker)
                        .subscribe(csv => {
                            hqTicker.csv = csv;
                            hqTicker.hqs = HqUtils.parseHqCsv(csv);
                            let sortHqs = HqUtils.hqSortByClose(hqTicker.hqs);
                            hqTicker.hqMinIndex  = hqTicker.hqs.findIndex((hq: Hq) => hq.date == sortHqs[0].date);
                            hqTicker.hqMaxIndex  = hqTicker.hqs.findIndex((hq: Hq) => hq.date == sortHqs[hqTicker.hqs.length-1].date);
                            hqTickers.push(hqTicker);
                        });
                    });
                return resolve(hqTickers);
            });
        });
    }

    getData(filename: string): Observable<any> {
        let url = `/${environment.dataFolder}/${filename}.json`;
        return this._http.get(url)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getCsv(ticker: string): Observable<any> {
        let url = `/${environment.csvFolder}/${ticker}.csv`;
        return this._http.get(url)
            .map((response: Response) => response.text())
            .catch(this.handleError);
    }

    getYahooChartUrl(ticker: string): string {
        return `https://finance.yahoo.com/chart/${ticker}`;
    }
    getTickers(): Observable<any> {
        let url = '/data/tickers.json';
        return this._http.get(url)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    getHq(ticker: string): Observable<any> {
        // historical from 1/1 last year to today
        let today: any[] = new Date().toLocaleString().split(',')[0].split('/');
        let url: string = `http://real-chart.finance.yahoo.com/table.csv?s=${ticker}&a=00&b=1&c=${today[2]-1}&d=${today[0]-1}&e=${today[1]}&f=${today[2]}&g=d&ignore=.csv`;
        return this._http.get(url)
            .map((response: Response) => response.text())
            .catch(this.handleError);
    }
    getIntraday(ticker: string): Observable<any> {
        let url = `http://chartapi.finance.yahoo.com/instrument/1.0/${ticker}/chartdata;type=quote;range=1d/csv`;
        return this._http.get(url)
            .map((response: Response) => response.text())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}