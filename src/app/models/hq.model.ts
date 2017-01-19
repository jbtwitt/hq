import { IqTicker } from './iq.model';

export class HqTicker {
    ticker: string;
    hqs: Hq[];
    hqMinIndex: number;
    hqMaxIndex: number;
    csv: string;
    constructor (ticker: string) {this.ticker = ticker;}
}
export class Hq {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adjClose: number;
    // extended data
    prevClose: number;
    // change: number;
    // changePercent: number;
    // volatilePercent: number;

    constructor(
        date: string,
        open: number,
        high: number,
        low: number,
        close: number,
        volume: number,
        adjClose: number,
    ) {
        this.date = date;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.volume = volume;
        this.adjClose = adjClose;        
    }
}
export class IqHqTicker {
  iqTicker: IqTicker;
  hq: Hq;
  hqTail: number;
}
