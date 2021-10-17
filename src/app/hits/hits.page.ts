import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HitsService } from './hits.service';

@Component({
  selector: 'app-hits',
  templateUrl: './hits.page.html',
  styleUrls: ['./hits.page.scss'],
})
export class HitsPage implements OnInit, OnDestroy {
  hits4$: Observable<any>;

  constructor(
    private hitsService: HitsService
  ) { }

  ngOnInit() {
    this.hitsService.checkGamerAndTopTenGames();
  }

  ngOnDestroy() {

  }

}
