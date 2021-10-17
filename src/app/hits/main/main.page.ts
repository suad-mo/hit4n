/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

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
  currentGamer$ = new Observable<string>();

  private sub: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private hitService: HitsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.topTenGames$ = this.hitService.topTenGames;
    this.currentGamer$ = this.hitService.currentGamer;
  }

  onOpenNewGame() {
    console.log('Početak igre...');
    this.openNewGameModal();
  }

  private openNewGameModal() {
    let currentGamer: string;
    let topTenGames: HitGame[];
    this.sub = this.currentGamer$.pipe(
      switchMap(gamer => {
        currentGamer = gamer;
        return this.topTenGames$;
      }))
      .subscribe(topGames => {
        topTenGames = topGames
      });
    this.modalCtrl
      .create({
        component: NewGameComponent,
        componentProps: {
          gamer: currentGamer
        },
        animated: true
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resData => {
        if (resData.role === 'success') {
          const topTenG = [...topTenGames];
          let isUpdateTopTen = false;
          if (topTenG.length <= 9) {
            topTenG.push(resData.data);
            topTenG.sort((a, b) => a.duration - b.duration);
            isUpdateTopTen = true;
          } else {
            if (topTenG[9].duration > resData.data.duration) {
              topTenG[9] = resData.data;
              topTenG.sort((a, b) => a.duration - b.duration);
              isUpdateTopTen = true;
            }
          }
          if (isUpdateTopTen) {
            this.lastGameIndex = topTenG.findIndex(hitGame =>
              hitGame.duration === resData.data.duration
            );
            this.hitService.setTopTenGames([...topTenG]);
          }
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

