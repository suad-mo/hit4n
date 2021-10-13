/* eslint-disable @angular-eslint/no-input-rename */
import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Hit, HitGame } from '../../hits.model';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {
  @Output() newGame: HitGame;
  @Input() gamer: string;
  currentEnterNums: number[];
  isStarting = false;
  isKeyboard = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onStartNewGame() {
    this.newGame = new HitGame(this.gamer);
    console.log(this.newGame);
    this.isStarting = true;
    this.isKeyboard = true;
  }

  onCancel() {
    if (this.newGame) {
      this.modalCtrl.dismiss(this.newGame, 'cancel');
    }
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onNewNumbers(nums: number[]) {
    console.log('event', nums);
    this.currentEnterNums = [...nums];
  }

  onFinishEnterNumbers() {
    if (this.currentEnterNums.length === 4) {
      this.newGame.addHit(this.currentEnterNums);
      this.currentEnterNums = [];
      if (this.newGame.isBingo) {
        this.isKeyboard = false;
      }
    }
  }
}
