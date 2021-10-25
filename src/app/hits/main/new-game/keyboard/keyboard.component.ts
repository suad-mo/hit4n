/* eslint-disable @angular-eslint/no-output-rename */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/no-input-rename */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromMain from '../../store/main.reducer';
import * as MainActions from '../../store/main.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  keyboard$: Observable<boolean[]> = this.store.select(fromMain.getKeyboard);
  aaaa$: Observable<number[]> = this.store.select(fromMain.getAaaa);

  constructor(
    private store: Store<fromMain.State>
  ) { }

  ngOnInit() { }

  async onEnterNumber(num: number) {
    await this.store.dispatch(MainActions.addOneNumber({
      num
    }));
  }

}
