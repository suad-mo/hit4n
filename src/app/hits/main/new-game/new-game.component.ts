/* eslint-disable @angular-eslint/no-input-rename */
import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HitGame } from '../../hits.model';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {
  @Output() newGame: HitGame;
  @Input() gamer: string;

  constructor(private modalCtrl: ModalController) {
  }

  // eslint-disable-next-line no-trailing-spaces
  ngOnInit() {
    this.newGame = new HitGame(this.gamer);
    console.log(this.newGame);
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
