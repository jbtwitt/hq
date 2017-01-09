import { Hq } from '../models/hq.model';
import { Iq, IqTicker } from '../models/iq.model';
import { environment } from '../../environments/environment';

export const HqUtils = {
    hqSortByClose: (_hqs: Hq[]): Hq[] => {
        let hqs = _hqs.slice(0);
        hqs.sort((a: Hq, b: Hq) => a.close - b.close);
        return hqs;
    },
    parseHqCsv(csv: string): Hq[] {
        let hqs: Hq[] = new Array<Hq>();
        let lines = csv.split('\n');
        // let len = (lines.length > environment.hqParseLength) ? environment.hqParseLength : lines.length;
        let prevHq: Hq = null;
        for(let i=1; i<environment.hqParseLength; i++) {
            let q = lines[i].split(',');
            let hq = new Hq(q[0],
                parseFloat(q[1]),
                parseFloat(q[2]),
                parseFloat(q[3]),
                parseFloat(q[4]),
                parseInt(q[5]),
                parseFloat(q[6]));
            hqs.push(hq);
            if (prevHq != null) {
                // calculate extended info
                prevHq.prevClose = hq.close;
                // prevHq.change = prevHq.close - hq.close;
                // prevHq.changePercent = prevHq.change / hq.close;
                // prevHq.volatilePercent = (prevHq.high - prevHq.low) / hq.close;
            }
            prevHq = hq;
        }
        hqs.pop();  // remove the last element as the extended is not calculated
        return hqs;
    },
    parseIqCsv(csv: string): IqTicker {
        let iqs = new Array<Iq>();
        var lines = csv.split('\n');
        var headers = {};
        for (var i=0; i<17; i++) {
            var h = lines[i].split(':');
            headers[h[0]] = h[1];
        }
        // console.log(headers.gmtoffset);
//        var timestamps = headers.Timestamp.split(',');
        // var labels = headers.labels.split(',');
        // console.log(timestamps);
        // timestamps.forEach((v) => {console.log('ts:' + new Date(1000*v))});
        // labels.forEach((v) => {console.log('labels:' + new Date(1000*v))});
//        var closes = headers.close.split(',');
        // var highs = headers.high.split(',');
        // var lows = headers.low.split(',');
        // var opens = headers.open.split(',');
        // closes.forEach((v) => {console.log('close:', v)});
        let prevIq: Iq = null;
        for(var i=lines.length-2; i>=17; i--) {
            let iq = new Iq;
            let cols = lines[i].split(',');
            iq.tick = parseInt(cols[0]);
            iq.timestamp = new Date(1000 * iq.tick);
            iq.close = parseFloat(cols[1]);
            iq.high = parseFloat(cols[2]);
            iq.low = parseFloat(cols[3]);
            iq.open = parseFloat(cols[4]);
            iq.volume = parseInt(cols[5]);
            if (prevIq != null) {
                prevIq.prevClose = iq.close;
            }
            prevIq = iq;
            iqs.push(iq);
        }
        let iqTicker = new IqTicker;
        iqTicker.ticker = headers['ticker'];
        iqTicker.iqs = iqs;
        iqTicker.headers = headers;
        iqTicker.prevClose = +headers['previous_close'];
        return iqTicker;
    },
    iq2hq(iqTicker: IqTicker): Hq {
        let hq = new Hq('', 0,0,0,0,0,0);
        // let high = 0.0, low = 99999.0;
        let volume = 0;
        for (let j=0; j<iqTicker.iqs.length; j++) {
            // let iq = iqTicker.iqs[j];
            volume += iqTicker.iqs[j].volume;
            // if (iq.high > high) high = iq.high;
            // if (iq.low < low) low = iq.low;
        }
        // hq.high = high;
        hq.high = +iqTicker.headers['high'].split(',')[1];
        // hq.low = low;
        hq.low = +iqTicker.headers['low'].split(',')[0];
        hq.volume = volume;
        hq.close = iqTicker.iqs[0].close;
        hq.open = iqTicker.iqs[iqTicker.iqs.length - 1].open;
        hq.prevClose = iqTicker.prevClose;
        return hq;
    },
    blendIqs(iqs: Iq[], n: number=5): Iq[] {
        let _iqs: Iq[] = new Array<Iq>();
        for (let i=iqs.length-1; i>=0; i-=n) {
            let _iq = new Iq;
            _iq.tick = iqs[i].tick;
            _iq.timestamp = iqs[i].timestamp;
            _iq.open = iqs[i].open;
            let last = ((i-n) < 0) ? 0 : (i-n)+1;
            _iq.close = iqs[last].close;
            let high = 0.0, low = 99999.0;
            let volume = 0;
            for (let j=i; j>=last; j--) {
                let iq = iqs[j];
                volume += iq.volume;
                if (iq.high > high) high = iq.high;
                if (iq.low < low) low = iq.low;
            }
            _iq.high = high;
            _iq.low = low;
            _iq.volume = volume;
            _iqs.push(_iq);
        }
        return _iqs;
    }
};