/* eslint-disable @angular-eslint/no-input-rename */
import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Hit, HitGame } from '../../hits.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../app.reducer';
import * as fromMain from '../store/main.reducer';
import * as MainActions from '../store/main.actions';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {
  isStarting = false;
  isKeyboard = false;

  initGame: HitGame;

  game$: Observable<HitGame>;
  xxxx$: Observable<number[]>;
  aaaa$: Observable<number[]>;
  isFinish$: Observable<boolean>;

  gamer$: Observable<string> = this.storeApp.select(fromApp.getGamer);

  constructor(
    private modalCtrl: ModalController,
    private store: Store<fromMain.State>,
    private storeApp: Store<fromApp.State>
  ) { }

  ngOnInit() {
    this.game$ = this.store.select(fromMain.getGame);
    this.xxxx$ = this.store.select(fromMain.getXxxx);
    this.aaaa$ = this.store.select(fromMain.getAaaa);
    this.isFinish$ = this.store.select(fromMain.getIsFinish);
  }

  async onStartGame(gamer: string) {
    this.isStarting = true;
    this.isKeyboard = true;
    await this.store.dispatch(
      MainActions.startGame({
        gamer
      })
    );
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onNewNumbers(nums: number[]) {
    this.store.dispatch(
      MainActions.addHit({
        nums,
      })
    );
  }

  onFinish(game: HitGame) {
    this.modalCtrl.dismiss(game, 'success');
  }
}

  // onFinishEnterNumbers() {
  //   if (this.aaaa.length === 4) {
  //     const g = this.game;
  //     g.addHit(this.aaaa);
  //     this.game = g;
  //     this.aaaa = [];
  //     if (this.game.isBingo) {
  //       this.modalCtrl.dismiss(this.game, 'success');
  //       this.isKeyboard = false;
  //     }
  //   }
  // }


