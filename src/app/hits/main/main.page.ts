/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { domainToASCII } from 'url';
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

  private hitSub: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private hitsService: HitsService
  ) { }

  ngOnInit() {
    this.hitSub = this.hitsService.readStore()
      .subscribe(data => {
        if (data && data.gamer) {
          this.gamer = data.gamer;
        }
        if (data && data.topTenGames?.length > 0) {
          this.topTenGames = [...data.topTenGames];
          this.topTenGames.sort((a, b) => a.duration - b.duration);
        }
      });
  }

  onStartNewGame() {
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
        console.log(resData);
        if (resData.role === 'success') {
          if (this.topTenGames.length <= 5) {
            this.topTenGames.push(resData.data);
            this.topTenGames.sort((a, b) => a.duration - b.duration);
          } else {
            if (this.topTenGames[4].duration > resData.data.duration) {
              this.topTenGames[4].duration = resData.data.duration;
              this.topTenGames.sort((a, b) => a.duration - b.duration);
            }
          }
          this.lastGameIndex = this.topTenGames.findIndex(hitGame =>
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
             hitGame.duration === resData.data.duration
          );
          this.hitsService.writeStore(this.gamer, this.topTenGames);
        }
      });
  }

  ngOnDestroy() {
    if (this.hitSub) {
      this.hitSub.unsubscribe();
    }
  }

}
