import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Hit, HitGame } from '../hits.model';
import { HitsService } from '../hits.service';
import { State, Store } from '@ngrx/store';
import * as fromHits from '../store/hits.reducer';
import * as HitsAction from '../store/hits.actions';
import * as fromApp from '../../app.reducer';
import * as data from '../../../assets/data/top-ten-games';

const TOP_TEN_GAMES: HitGame[] = data.topTenGames as unknown as HitGame[];
@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit, OnDestroy {
  currentGamer$: Observable<string>;
  topTenGames$: Observable<HitGame[]>;

  toogleCheck = false;
  // isDelete = false;
  // isLoad = true;

  private sub: Subscription;
  private sub1: Subscription;

  constructor(
    private hitService: HitsService,
    private alertCtrl: AlertController,
    private store: Store<fromApp.State>
  ) { }

  ngOnInit() {
    this.currentGamer$ = this.store.select(fromApp.getGamer);
    this.topTenGames$ = this.store.select(fromApp.getTopTenGames);
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
          // this.hitService.setCurrentGamer(resData.value);
          this.store.dispatch(HitsAction.startChangeLS({
            gamer: resData.value
          }));
        }
      });
  };

  onChangeCurrentGamer = async () => {
    const { value, cancelled } = await Dialog.prompt({
      title: 'Hello',
      message: `What's your name?`,
    });
    console.log('Name:', value);
    console.log('Cancelled:', cancelled);

    if (value && !cancelled) {
      this.store.dispatch(HitsAction.startChangeLS({
        gamer: value
      }));
    }
  };

  onClearTopTenGames() {
    this.presentAlertConfirm()
      .then(() => console.log('Start Clear....'));
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
            this.store.dispatch(HitsAction.startChangeLS({
              topTenGames: []
            }));
          }
        }
      ]
    });

    await alert.present();
  }

  onLoadTopTenGames() {
    this.store.dispatch(HitsAction.startChangeLS({
      topTenGames: TOP_TEN_GAMES
    }));
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
