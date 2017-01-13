import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Hq, HqTicker } from '../models/hq.model';
import { HqStat, HqStatBack2Back, HqStatHighLowInLastDays, HqStatMinMax } from '../models/stat.model';
import { CandlestickPatternDef, PatternDef } from '../models/stat.model';
import { HqUtils } from './hq-utils';
import { HqStatClass } from './hq-stat.class';

@Injectable()

export class HqStatService {

  isDoji(hqTicker: HqTicker, dayIdx: number=0): boolean {
    return this.isHqDoji(hqTicker.hqs[dayIdx]);
  }
  isHqDoji(hq: Hq): boolean {
    if (Math.abs(hq.close - hq.open)/hq.prevClose <= CandlestickPatternDef.dojiSize) {
      return true;
    }
    return false;
  }
  isHammer(hqTicker: HqTicker, dayIdx: number=0): boolean {
      return this.isHqHammer(hqTicker.hqs[dayIdx]);
  }
  isHqHammer(hq: Hq): boolean {
    if (Math.abs(hq.close - hq.open)/hq.prevClose <= 0.005
    && ((hq.high - Math.min(hq.close, hq.open))/hq.prevClose <= 0.007
    || (Math.max(hq.close, hq.open) - hq.low)/hq.prevClose) <= 0.007) {
      return true;
    }
    return false;
  }
  hqHighLow(hqTicker: HqTicker, idx: number): number {
      let hq0 = hqTicker.hqs[idx],
        hq1 = hqTicker.hqs[idx+1];
      return (hq0.high-hq0.low) / (hq1.high-hq1.low);
  }

    statHq(ticker: string, hqs: Hq[]): HqStat {
        let hqStat = new HqStat(ticker);
        let hq0 = hqs[0], hq1 = hqs[1];
        hqStat.lastHq = hq0;
        hqStat.hqStatHighLowInLastDays = this.hqStatHighLowInLastDays(hqs);

        hqStat.hqCloseMinMax = this.getMinMaxByClose(hqs);
        hqStat.deltaVolatiles = this.getDeltaVolatile(hqs);
        for (let i=0; i<hqs.length;) {
            let b2b = this.getBack2Back(hqs, i);
            i += b2b.upDays + b2b.dnDays + b2b.eqDays;
            hqStat.b2bs.push(b2b);
        }
        return hqStat;
    }
    hqStatPatterns(hqs: Hq[], startDay: number=0): void {
        let pattern: number = null;
        let hq0 = hqs[startDay];
        let hq1 = hqs[startDay + 1];
        // engulfing: high-high & low-low
        if (hq0.high > hq1.high && hq0.low < hq1.low) {

            //*** ???: how to find trend for bull or bear
            let hq2 = hqs[startDay + 2];
            let hqN = hqs[startDay + 5];
            if ((hq1.high > hq2.high && hq1.low > hq2.low) // upTrend: high-high & high-low
                || (hq1.close > hqN.close) //turning point agaist the up trend from N days ago to prev day
            ) {
                pattern = PatternDef.BearishEngulfingCandlestick;
            } else if ((hq1.high < hq2.high && hq1.low < hq2.low) // dnTrend: low-high & low-low
                || (hq1.close > hqN.close) //turning point agaist the down trend from N days ago to prev day
            ) {
                pattern = PatternDef.BullishEngulfingCandlestick;
            }
        }
    }
    hqStatHighLowInLastDays(hqs: Hq[], lastDays: number=5): HqStatHighLowInLastDays {
        let hqStatHighLowInLastDays = new HqStatHighLowInLastDays;
        let hqSorts = HqUtils.hqSortByClose(hqs);
        for (let i=0; i<lastDays; i++) {
            if (lastDays > hqs.findIndex((hq: Hq) => hq.date == hqSorts[i].date)) {
                hqStatHighLowInLastDays.lowInLastDays ++;
            }
        }
        hqSorts.reverse();
        for (let i=0; i<lastDays; i++) {
            if (lastDays > hqs.findIndex((hq: Hq) => hq.date == hqSorts[i].date)) {
                hqStatHighLowInLastDays.highInLastDays ++;
            }
        }
        return hqStatHighLowInLastDays;
    }
    getDeltaVolatile(hqs: Hq[]): number[] {
        let deltaVolatiles:number[] = new Array<number>();
        for (let i=0,j=1; j<hqs.length; i++,j++) {
            let hq0 = hqs[i], hq1 = hqs[j];
            deltaVolatiles.push((hq0.high - hq0.low) / (hq1.high - hq1.low));
        }
        return deltaVolatiles;
    }
    getBack2Back(hqs: Hq[], startDay: number): HqStatBack2Back {
        let b2b = new HqStatBack2Back;
        let lastQ = hqs[startDay];
        let upFlag = lastQ.close > lastQ.prevClose;
        let downFlag = lastQ.close < lastQ.prevClose;
        let eqFlag = lastQ.close == lastQ.prevClose;
        let len = hqs.length;
        for(let i=startDay; i<len; i++) {
            let hq = hqs[i];
            let up = (hq.close > hq.prevClose);
            let dn = (hq.close < hq.prevClose);
            let eq = (hq.close == hq.prevClose);
            if (upFlag && up) {
                b2b.upDays ++;
            } else if (downFlag && dn) {
                b2b.dnDays ++;
            } else if (eqFlag && eq) {
                b2b.eqDays ++;
            } else {
                break;
            }
        }
        return b2b;
    }
    getMinMaxByClose(hqs: Hq[]): HqStatMinMax {
        let hqMinMax = new HqStatMinMax;
        hqMinMax.minHq = hqMinMax.maxHq = hqs[0];
        for (let i=1; i<hqs.length; i++) {
            let hq = hqs[i];
            hqMinMax.minHq = (hq.close < hqMinMax.minHq.close) ? hq : hqMinMax.minHq;
            hqMinMax.maxHq = (hq.close > hqMinMax.maxHq.close) ? hq : hqMinMax.maxHq;
        }
        return hqMinMax;
    }
}