export const Const = {
    timestamp: 0,
    close: 1,
    high: 2,
    low: 3,
    open: 4,
    volume: 5,
}
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