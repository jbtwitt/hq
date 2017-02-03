import { Component, OnInit } from '@angular/core';
import { WsService } from './services/ws.service';

@Component({
  selector: 'app-root',
  template: require('./app.component.html'),
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private wsService: WsService) {}
  ngOnInit() {
    // this.wsService.async_observable_samples();
    // this.wsService.getIq('NUGT');
  }
}
