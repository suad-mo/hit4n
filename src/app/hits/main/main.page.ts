/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from './../../app.reducer';
import * as fromHits from './../store/hits.reducer';
import * as HitsAction from './../store/hits.actions';
import * as fromMain from './store/main.reducer';
import * as MainActions from './store/main.actions';

import { HitGame } from '../hits.model';
import { NewGameComponent } from './new-game/new-game.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  lastGameIndex: number;

  lastGameIndex$: Observable<number>;
  topTenGames$ = new Observable<HitGame[]>();
  gamer$ = new Observable<string>();

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private store: Store<fromApp.State>
  ) { }

  ngOnInit() {
    this.topTenGames$ = this.store.select(fromApp.getTopTenGames);
    this.gamer$ = this.store.select(fromApp.getGamer);
    this.lastGameIndex$ = this.store.select(fromApp.getIndexLastGame)
  }

  async onOpenNewGame() {
    await this.store.dispatch(MainActions.cancelGame());
    this.openNewGameModal();
  }

  private openNewGameModal() {
    this.modalCtrl
      .create({
        component: NewGameComponent,
        animated: true,
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resData) => {
        if (resData.role === 'success') {
          console.log('Success...');
          this.store.dispatch(HitsAction.addNewGameInTopTen({
            newGame: resData.data
          }));
        } else {
          console.log('Cancel...');
        }
      });
  }

  onOpenDetails(index: number) {
    this.router.navigate(['hits/main/games', index]);
  }
}
