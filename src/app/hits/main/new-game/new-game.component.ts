/* eslint-disable @angular-eslint/no-input-rename */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  game$: Observable<HitGame>;
  xxxx$: Observable<number[]>;
  aaaa$: Observable<number[]>;

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
}
