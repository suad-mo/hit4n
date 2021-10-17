/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

import { HitGame } from '../hits.model';
import { HitsService } from '../hits.service';
import { NewGameComponent } from './new-game/new-game.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  lastGameIndex: number;
  topTenGames: HitGame[] = [];
  currentGamer: string;

  constructor(
    private modalCtrl: ModalController,
    private hitService: HitsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.topTenGames = this.hitService.topTenGames;
    this.currentGamer = this.hitService.currentGamer;
  }

  ionViewDidEnter() {
    this.currentGamer = this.hitService.currentGamer;
  }

  onOpenNewGame() {
    console.log('Početak igre...');
    this.openNewGameModal();
  }

  private openNewGameModal() {
    this.modalCtrl
      .create({
        component: NewGameComponent,
        componentProps: {
          gamer: this.currentGamer
        },
        animated: true
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
              hitGame.duration === resData.data.duration
            );
            this.topTenGames = [...topTenG];
            this.hitService.setTopTenGames([...topTenG]);
          }
        }
      });
  }

  onOpenDetails(index: number) {
    this.router.navigate(['hits/main/games',index]);
  }
}
