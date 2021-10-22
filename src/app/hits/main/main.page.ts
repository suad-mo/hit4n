/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromApp from './../../app.reducer';
import * as fromHits from './../store/hits.reducer';
import * as HitsAction from './../store/hits.actions';
import * as fromMain from './store/main.reducer';

import { Hit, HitGame } from '../hits.model';
import { HitsService } from '../hits.service';
import { NewGameComponent } from './new-game/new-game.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {
  lastGameIndex: number;
  topTenGames$ = new Observable<HitGame[]>();
  gamer$ = new Observable<string>();

  private sub: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private hitService: HitsService,
    private router: Router,
    private store: Store<fromApp.State>
  ) { }

  ngOnInit() {
    //this.topTenGames$ = this.hitService.topTenGames;
    this.topTenGames$ = this.store.select(fromApp.getTopTenGames);
    this.gamer$ = this.store.select(fromApp.getGamer);
  }

  onOpenNewGame() {
    console.log('Početak igre...');
    this.openNewGameModal();
  }

  private openNewGameModal() {
    let currentGamer: string;
    let topTenGames: HitGame[];
    this.modalCtrl
      .create({
        component: NewGameComponent,
        animated: true,
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(async (resData) => {
        if (resData.role === 'success') {
          console.log('Success...');
          await this.store.dispatch(HitsAction.addNewGameInTopTen({
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

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
