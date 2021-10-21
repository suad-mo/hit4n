/* eslint-disable @angular-eslint/no-input-rename */
import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Hit, HitGame } from '../../hits.model';
import { Store } from '@ngrx/store';
import * as fromMain from '../store/main.reducer';
import * as MainActions from '../store/main.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {
  @Output() newGame: HitGame;
  @Output() xxxx: number[] = [];
  @Input() gamer: string;
  currentEnterNums: number[];
  isStarting = false;
  isKeyboard = false;

  newGame$: Observable<HitGame> = this.store.select(fromMain.getNewGame);
  xxxx$: Observable<number[]> = this.store.select(fromMain.getXxxx);
  aaaa$: Observable<number[]> = this.store.select(fromMain.getAaaa);
  n$: Observable<boolean> = this.store.select(fromMain.getIsFinish);


  constructor(
    private modalCtrl: ModalController,
    private store: Store<fromMain.State>
  ) {}

  ngOnInit() {}

  onStartNewGame() {
    this.store.dispatch(MainActions.startNewGame({
      gamer: this.gamer
    }));
    this.newGame = new HitGame(this.gamer);
    this.isStarting = true;
    this.isKeyboard = true;
    this.xxxx = this.newGame.xxxx;
    console.log(this.xxxx);
  }

  onCancel() {
    if (this.newGame) {
      this.modalCtrl.dismiss(this.newGame, 'cancel');
    }
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onNewNumbers(nums: number[]) {
    this.currentEnterNums = [...nums];
  }

  onFinishEnterNumbers() {
    if (this.currentEnterNums.length === 4) {
      this.newGame.addHit(this.currentEnterNums);
      this.currentEnterNums = [];
      if (this.newGame.isBingo) {
        this.modalCtrl.dismiss(this.newGame, 'success');
        this.isKeyboard = false;
      }
    }
  }
}
