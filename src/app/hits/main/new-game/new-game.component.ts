/* eslint-disable @angular-eslint/no-input-rename */
import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Hit, HitGame } from '../../hits.model';
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
  isKeyboard = false;

  game: HitGame;
  aaaa: number[];

  xxxx$: Observable<number[]> = this.store.select(fromMain.getXxxx);
  aaaa$: Observable<number[]> = this.store.select(fromMain.getAaaa);
  n$: Observable<boolean> = this.store.select(fromMain.getIsFinish);

  gamer$: Observable<string> = this.storeApp.select(fromApp.getGamer);


  constructor(
    private modalCtrl: ModalController,
    private store: Store<fromMain.State>,
    private storeApp: Store<fromApp.State>
  ) {}

  ngOnInit() {}

  // onStartNewGame() {
  //   this.store.dispatch(MainActions.startGame({
  //     gamer: this.gamer
  //   }));
  //   this.newGame = new HitGame(this.gamer);
  //   this.isStarting = true;
  //   this.isKeyboard = true;
  //   this.xxxx = this.newGame.xxxx;
  //   console.log(this.xxxx);
  // }

  onStartGame(gamer: string) {
    this.game = new HitGame(gamer);
    console.log(this.game.xxxx);
    this.store.dispatch(MainActions.startGame({
      game: this.game
    }));
    this.isStarting = true;
    this.isKeyboard = true;
  }

  onCancel() {
    if (this.game) {
      this.modalCtrl.dismiss(this.game, 'cancel');
    }
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onNewNumbers(nums: number[]) {
    this.aaaa = [...nums];
    this.store.dispatch(MainActions.addHit({
      nums
    }));
  }

  onFinishEnterNumbers() {
    if (this.aaaa.length === 4) {
      const g = this.game;
      g.addHit(this.aaaa);
      this.game = g;
      this.aaaa = [];
      if (this.game.isBingo) {
        this.modalCtrl.dismiss(this.game, 'success');
        this.isKeyboard = false;
      }
    }
  }
}
