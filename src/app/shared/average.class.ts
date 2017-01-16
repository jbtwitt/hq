import { Hq, HqTicker } from '../models/hq.model';

export const average = {
    //simple moving average
    sma(hqTicker: HqTicker, days: number=5, segs: number=5, dayIndex: number=0): number[] {
        let avgs = [];
        let len = hqTicker.hqs.length - days;
        for (let i=dayIndex,seg=0; seg<segs&&i<len; i++,seg++) {
            let sum = hqTicker.hqs[i].close;
            for (let j=i+1; j<i+days; j++) {
                sum += hqTicker.hqs[j].close;
            }
            avgs.push(sum/days);
        }
        return avgs;
    }
}