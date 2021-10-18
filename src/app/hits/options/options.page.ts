import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Hit, HitGame } from '../hits.model';
import { HitsService } from '../hits.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit, OnDestroy {
  currentGamer$ = new Observable<string>();
  topTenGames$ = new Observable<HitGame[]>();

  toogleCheck = false;
  isDelete = false;
  isLoad = true;

  private sub: Subscription;
  private sub1: Subscription;

  constructor(
    private hitService: HitsService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.currentGamer$ = this.hitService.currentGamer;
    this.sub1 = this.hitService.topTenGames
    .pipe(
      map(games => games.length > 0)
    )
    .subscribe(bool => {
      this.isDelete = bool;
      this.isLoad = !bool;
    });
  }

  onChangeGamer() {
    let currentGamer: string;
    this.sub = this.currentGamer$
      .subscribe(gamer => {
        currentGamer = gamer;
      });
    Dialog.prompt({
      title: 'Hello gamer!',
      message: `What's your name?`,
      inputText: currentGamer
    })
      .then(resData => {
        if (!resData.cancelled && resData.value) {
          this.hitService.setCurrentGamer(resData.value);
        }
      });
  };

  onClearTopTenGames() {
    this.presentAlertConfirm()
      .then(() => this.isDelete = false);
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure you want to delete <strong>Top Ten Games </strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: () => {
            this.hitService.clearTopTenGames();
          }
        }
      ]
    });

    await alert.present();
  }

  onLoadTopTenGames() {
    this.hitService.onLoadTopTenGames();
    this.isLoad = false;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
