import { Hq, HqTicker } from '../models/hq.model';
import { HqStatBack2Back } from '../models/stat.model';

export class HqStatClass {
    hqTicker: HqTicker;
    startDay: number;
    constructor(hqTicker: HqTicker, day: number=0) {
        this.hqTicker = hqTicker;
        this.startDay = day;
    }
    getB2bs(): HqStatBack2Back[] {
        let b2bs = new Array<HqStatBack2Back>();
        for (let i=this.startDay; i<this.hqTicker.hqs.length; ) {
            let b2b = this.getB2b(i);
            i += b2b.upDays + b2b.dnDays + b2b.eqDays;
            b2bs.push(b2b);
        }
        return b2bs;
    }
    getB2b(startDay: number): HqStatBack2Back {
        let b2b = new HqStatBack2Back;
        let lastQ = this.hqTicker.hqs[startDay];
        let upFlag = lastQ.close > lastQ.prevClose;
        let downFlag = lastQ.close < lastQ.prevClose;
        let eqFlag = lastQ.close == lastQ.prevClose;
        let len = this.hqTicker.hqs.length;
        for(let i=startDay; i<len; i++) {
            let hq = this.hqTicker.hqs[i];
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
}