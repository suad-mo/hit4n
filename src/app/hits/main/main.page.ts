/* eslint-disable @typescript-eslint/member-ordering */
import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { HitGame } from '../hits.model';
import { HitsService } from '../hits.service';
import { NewGameComponent } from './new-game/new-game.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {
  gamer = 'Suad';
  topTenGames: HitGame[] = [];
  lastGameIndex: number;

  name: string;
  topTen: HitGame[] = [];

  private hitSub: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private hitsService: HitsService,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.checkTopTenGames();
    this.checkName();
    this.hitSub = this.hitsService.readStore()
      .subscribe(data => {
        if (data && data.gamer) {
          this.gamer = data.gamer;
        }
        if (data && data.topTenGames?.length > 0) {
          this.topTenGames = [...data.topTenGames];
          //this.topTenGames.sort((a, b) => a.duration - b.duration);
        }
      });
  }

  async ionViewDidEnter() {
    await this.checkName();
  }

  checkGamer = async () => {
    const { value } = await Storage.get({ key: 'gamer' });
    if (value) {
      this.gamer = value;
    }
  };

  checkName = async () => {
    const { value } = await Storage.get({ key: 'gamer' });
    this.name = value;
  };

  checkTopTenGames = async () => {
    const { value } = await Storage.get({ key: 'topTenGames' });
    this.topTen = JSON.parse(value) as HitGame[];;
  };

  onOpenNewGame() {
    console.log('Početak igre...');
    this.openNewGameModal();
  }

  private openNewGameModal() {
    this.modalCtrl
      .create({
        component: NewGameComponent,
        componentProps: {
          gamer: this.gamer,
        }
        //presentingElement: this.modalCtrl.getTop()
        , animated: true
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resData => {
        if (resData.role === 'success') {
          const topTenG = [...this.topTenGames];
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
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              hitGame.duration === resData.data.duration
            );
            this.topTenGames = [...topTenG];
            this.topTen = [...topTenG];
            // this.hitsService.writeStore(this.gamer, topTenG);
            this.setTopTenGames(topTenG);
          }
        }
      });
  }

  setTopTenGames = async (topTen: HitGame[]) => {
    const topTenGamesData = JSON.stringify(topTen);
    await Storage.set({ key: 'topTenGames', value: topTenGamesData});
  };

  onOpenDetails(hitGame: HitGame, index: number, xxxx: number[]) {
    this.hitsService.setHitGame(hitGame, index, xxxx);
    this.router.navigate(['hits/main/games',index]);
  }

  ngOnDestroy() {
    if (this.hitSub) {
      this.hitSub.unsubscribe();
    }
  }

}
