import { Component, OnInit } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HitGame } from '../hits.model';
import { Store } from '@ngrx/store';
import * as HitsAction from '../store/hits.actions';
import * as fromApp from '../../app.reducer';
import * as data from '../../../assets/data/top-ten-games';

const TOP_TEN_GAMES: HitGame[] = data.topTenGames as unknown as HitGame[];
@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  currentGamer$: Observable<string>;
  topTenGames$: Observable<HitGame[]>;

  toogleCheck = false;

  constructor(
    private alertCtrl: AlertController,
    private store: Store<fromApp.State>
  ) { }

  ngOnInit() {
    this.currentGamer$ = this.store.select(fromApp.getGamer);
    this.topTenGames$ = this.store.select(fromApp.getTopTenGames);
  }

  onChangeCurrentGamer = async (gamer: string) => {
    const { value, cancelled } = await Dialog.prompt({
      title: 'Hello',
      message: `What's your name?`,
      inputText: gamer
    });

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
}
