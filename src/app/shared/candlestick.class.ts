import { Hq, HqTicker } from '../models/hq.model';
/*
reversal

up/dn tail, realbody
            |
            o
            |
            |
            |

PinBarDef: tail > 2/3 body and realbody < 1/3 body
Morning Star
Bullish Piercing
Engulfing
Three Method
*/
// Trend Continuation
//  - false exhaustion
// Reversal
//  - exhaustion
// Consolidation (no direction)
//  - doji
//  - indecision
class Stick {
    stickBody: number;
    upWick: number;
    realBody: number;
    dnWick: number;
}
export class CandleStick {
    hqs: Hq[];
    hq0: Hq;
    hq1: Hq;
    hq2: Hq;
    startDay: number;
    constructor(hqTicker: HqTicker, day: number=0) {
        this.hqs = hqTicker.hqs;
        this.startDay = day;
        this.hq0 = hqTicker.hqs[day];
        this.hq1 = hqTicker.hqs[day + 1];
        this.hq2 = hqTicker.hqs[day + 2];
    }
    run(): string[] {
        let patterns = new Array<string>();
        let pattern = this.twoSticks();
        if (pattern != '') {
            patterns.push(pattern);
        }
        pattern = this.oneStick();
        if (pattern != '') {
            patterns.push(pattern);
        }
        return patterns;
    }
    oneStick(): string {
        if (this.hq0.open == this.hq0.close) {
            if (this.hq0.close == this.hq0.high) {
                return 'dragonfly doji';
            } else if (this.hq0.close == this.hq0.low) {
                return 'gravestone doji';
            } else {
                return 'doji';
            }
        } else {
            let stickBody = this.hq0.high - this.hq0.low;
            // upTail
            if (((this.hq0.high - Math.max(this.hq0.open, this.hq0.close)) / stickBody) > 0.6) {
                return 'long upper wick';
            } else {
                // dnTail
                if (((Math.min(this.hq0.open, this.hq0.close) - this.hq0.low) / stickBody) > 0.6) {
                    return 'long lower wick';
                }
            }            
        }
        return '';
    }
    pinBar() {
        let stickBody = this.hq0.high - this.hq0.low;
        let upTail = (this.hq0.high - Math.max(this.hq0.open, this.hq0.close));// / stickBody;
        let dnTail = (Math.min(this.hq0.open, this.hq0.close) - this.hq0.low);// / stickBody;
        let realBody = (this.hq0.close - this.hq0.open);// / stickBody;
    }
    twoSticks(): string {

        //
        // TODO: calculate the trend
        //

        // bullish
        if (this.hq0.close > this.hq0.open      // green body (current up)
            && this.hq1.close < this.hq1.open   // red body (previous down)
            && this.hq0.open < this.hq1.close   // open gap down
        ) {
            // but close above previous open
            if (this.hq0.close > this.hq1.open) return 'bullish engulfing';
            // but close between previous open and close
            else if (this.hq0.close > this.hq1.close) {
                // if (this.countDownDays(2) >= 2) return 'bullish piercing';  // reversal from down trend (need to confirm with down trend)
                return 'bullish piercing';  // reversal from down trend (need to confirm with down trend)
            }
        }
        // bearish
        else if (this.hq0.close < this.hq0.open // red body (current down)
            && this.hq1.close > this.hq1.open   // green body (previous up)
            && this.hq0.open > this.hq1.close   // open gap up
        ) {
            // but close below previous open
            if (this.hq0.close < this.hq1.open) return 'bearish engulfing';
            // but close between previous open and close
            else if (this.hq0.close < this.hq1.close) {
                // if (this.countUpDays(2) >= 2) return 'bearish dark-cloud cover';
                return 'bearish dark-cloud cover';
            }
        }
        return '';
    }
    countUpDays(len: number=5) {
        let count = 0;
        for (let i=this.startDay+1, j=i+1; i<=len; i++, j++) {
            if (this.hqs[i].close > this.hqs[j].close) count ++;
        }
        return count;
    }
    countDownDays(len: number=5) {
        let count = 0;
        for (let i=this.startDay+1, j=i+1; i<=len; i++, j++) {
            if (this.hqs[i].close < this.hqs[j].close) count ++;
        }
        return count;
    }
}