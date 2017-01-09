import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HqDataService } from '../shared/hq.service';

@Component({
  selector: 'app-iq',
  templateUrl: './iq.component.html',
  styleUrls: ['./iq.component.css']
})
export class IqComponent implements OnInit {
  tickers: string[];

  constructor(
    private hqDataService: HqDataService
  ) { }

  ngOnInit() {
    this.getTickers();
  }

  getTickers(): void {
    this.hqDataService.getData(environment.jsonData.tickers)
      .subscribe(data => this.tickers = data);
  }
}
