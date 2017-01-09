export class Iq {
    tick: number;
    timestamp: Date;
    close: number;
    high: number;
    low: number;
    open: number;
    volume: number;
    prevClose: number;
}
export class IqTicker {
    ticker: string;
    iqs: Iq[];
    headers: any;
    prevClose: number;
}