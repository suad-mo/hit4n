/* eslint-disable @angular-eslint/no-input-rename */
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { HitGame } from '../../hits.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../app.reducer';
import * as fromMain from '../store/main.reducer';
import * as MainActions from '../store/main.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {
  isStarting = false;
  hintRows: number[] = [];
  isHintRow = [false, false, false, false, false, false, false, false, false, false];

  game$: Observable<HitGame>;
  xxxx$: Observable<number[]>;
  aaaa$: Observable<number[]>;
  hint$: Observable<boolean[][]>;

  gamer$: Observable<string> = this.storeApp.select(fromApp.getGamer);

  constructor(
    private modalCtrl: ModalController,
    private store: Store<fromMain.State>,
    private storeApp: Store<fromApp.State>,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.game$ = this.store.select(fromMain.getGame);
    this.xxxx$ = this.store.select(fromMain.getXxxx);
    this.aaaa$ = this.store.select(fromMain.getAaaa);
    this.hint$ = this.store.select(fromMain.getHint);
  }

  async onStartGame(gamer: string) {
    this.isStarting = true;
    await this.store.dispatch(
      MainActions.startGame({
        gamer
      })
    );
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onDeleteOneNumber(index: number, value: number) {
    this.store.dispatch(MainActions.daleteOneNumber({ index, value }));
  }

  onFinish(game: HitGame) {
    this.modalCtrl.dismiss(game, 'success');
  }

  onHint(i: number, j: number) {
    let isHintRow = false;
    let l: number;
    let message: string;
    for (l of this.hintRows) {
      if (l === i) {
        isHintRow = true;
      }
    }
    if (!isHintRow) {
      this.hintRows.push(i);
      this.isHintRow[i] = true;
      this.store.dispatch(MainActions.addHint({ i, j }));
      //this.presentToast(`Already used hints in ${this.hintRows.map(n => n+1).toString()} rows`);
    } else {
      //this.presentToast(`Already used hints in <bold>${i + 1}.</bold> row`);
    }
  }

  private async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'bottom',
      color: 'medium'
    });
    toast.present();
  }
}
