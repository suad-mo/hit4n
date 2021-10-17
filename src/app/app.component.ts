import { Component, OnInit } from '@angular/core';
import { HitsService } from './hits/hits.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private hitsService: HitsService) {}

  ngOnInit() {
    this.hitsService.checkGamerAndTopTenGames();
  }
}
