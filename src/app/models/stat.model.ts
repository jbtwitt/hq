import { Hq, HqTicker } from '../models/hq.model';

export const CandlestickPatternDef = {
    hammer: 1,
    engulfing: 3,
    dojiSize: 0.003
}
export class HqStat {
    // hqTicker: HqTicker;
    ticker: string;
    lastHq: Hq;
    hqStatHighLowInLastDays: HqStatHighLowInLastDays;
    b2bs: HqStatBack2Back[] = new Array<HqStatBack2Back>();
    deltaVolatiles: number[];
    hqCloseMinMax: HqStatMinMax;

    constructor (ticker: string) {this.ticker = ticker;}
}
export class HqStatBack2Back {
    upDays: number = 0;
    downDays: number = 0;
    eqDays: number = 0;
}
export class HqStatHighLowInLastDays {
    highInLastDays: number = 0;
    lowInLastDays: number = 0;
}
export class HqStatMinMax {
    minHq: Hq;
    maxHq: Hq;
}
export const PatternDef = {
    engulfing: 3,
    BullishEngulfingCandlestick: 1,
    BearishEngulfingCandlestick: 2,
    doji: 4
}
export class HqStatPeriodTrendPattern {
    period: number = 1;     // default 1 day
    highPattern: number;
}
export const HighPattern = {
    highHigh: 1,
    lowHigh: 2,
    eqHigh: 3
}
//
// Engulfing Candlestick
export const HighLowPattern = {
    highHighHighLow: 1,     // bullish
    highHighLowLow: 2,      // engulf
    lowHighHighLow: 3,
    lowHighLowLow: 4        // bearish
}