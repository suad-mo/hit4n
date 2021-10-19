import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { HitsService } from './hits/hits.service';

import * as fromApp from './app.reducer';
import * as HitsActions from './hits/store/hits.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private hitsService: HitsService,
    private store: Store<fromApp.State>
  ) {}

  ngOnInit() {
    //this.hitsService.checkGamerAndTopTenGames();
    this.store.dispatch(HitsActions.loadDataLSStart());
  }
}
