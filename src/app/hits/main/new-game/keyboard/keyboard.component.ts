/* eslint-disable @angular-eslint/no-output-rename */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/no-input-rename */
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Hit, HitGame } from '../../../hits.model';
import { Store } from '@ngrx/store';
import * as fromMain from '../../store/main.reducer';
import * as MainActions from '../../store/main.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  @Output('newEnterNumber')
  public newEnterNumber: EventEmitter<number[]> = new EventEmitter();
  @Output('finishEnterNumber')
  public finishEnterNumber: EventEmitter<void> = new EventEmitter();
  @Output('hint')
  public hint: EventEmitter<number> = new EventEmitter();

  @Input('game')
  public game: HitGame;
  @Input('hits')
  public hits: Hit[];
  @Input('xxxx')
  public xxxx: number[];

  public aaaa: number[] = [];
  public total = 0;

  isOdabran: boolean[] = [false, false, false, false, false, false, false, false, false, false];
  isHint = true;

  keyboard$: Observable<boolean[]> = this.store.select(fromMain.getKeyboard);
  xxxx$: Observable<number[]> = this.store.select(fromMain.getXxxx);
  aaaa$: Observable<number[]> = this.store.select(fromMain.getAaaa);

  constructor(
    private store: Store<fromMain.State>
  ) { }

  ngOnInit() {
    this.store.select(fromMain.getGame).subscribe(data => {
      this.game = data;
    });
  }

  // onSelectNumber(n: number) {
  //   if (this.aaaa.length >= 4) {
  //     return;
  //   }
  //   this.aaaa.push(n);
  //   this.newEnterNumber.emit(this.aaaa);
  // }

  onEnterNumber(n: number) {
    if (this.aaaa.length >= 4) {
      return;
    }
    const a = [...this.aaaa];
    a.push(n);
    this.aaaa = [...a];
    this.isOdabran[n] = true;
    this.newEnterNumber.emit(this.aaaa);
    this.store.dispatch(MainActions.enterNumber({
      num: n
    }));
  }

  onOk() {
    this.finishEnterNumber.emit();
    this.isOdabran = [false, false, false, false, false, false, false, false, false, false];
    this.aaaa = [];
  }

  // onOky(nums: number[]) {
  //   if (nums.length === 4) {
  //     this.game.addHit(nums);
  //     this.store.dispatch(MainActions.updateGame({
  //       updateGame: this.game
  //     }));
  //   }
  //   this.store.dispatch(MainActions.addHit({
  //     nums
  //   }));
  // }

  onCancel() {
    this.isOdabran = [false, false, false, false, false, false, false, false, false, false];
    this.total = 0;
    this.aaaa = [];
    this.newEnterNumber.emit(this.aaaa);
    this.store.dispatch(MainActions.cancelHit());
  }

  // onCancel() {
  //   this.store.dispatch(MainActions.cancelHit());
  // }

  onHint() {
    if (this.total >= 4) {
      return;
    }
    const n = this.xxxx[this.total];
    this.aaaa.push(n);
    this.isOdabran[n] = true;
    this.total++;
    this.isHint = false;
    this.newEnterNumber.emit(this.aaaa);
  }

}
