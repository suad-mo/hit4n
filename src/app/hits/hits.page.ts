import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as HitsActions from './store/hits.actions';
import { HitsService } from './hits.service';

@Component({
  selector: 'app-hits',
  templateUrl: './hits.page.html',
  styleUrls: ['./hits.page.scss'],
})
export class HitsPage implements OnInit, OnDestroy {
  hits4$: Observable<any>;

  constructor(
    private hitsService: HitsService,
    private store: Store
  ) { }

  ngOnInit() {
    //this.hitsService.checkGamerAndTopTenGames();
    this.store.dispatch(HitsActions.loadDataLSStart());

  }

  ngOnDestroy() {

  }

}
