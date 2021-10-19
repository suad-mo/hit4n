import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Storage } from '@capacitor/storage';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as HitsActions from './hits.actions';
import { stringify } from 'querystring';

@Injectable()
export class HitsEffects {

  // loadHit4n$ = createEffect(() =>
  //   this.actions$.pipe(
  //       ofType(HitsActions.loadLSDataStart),
  //       map(() => {
  //         const hit4n = {
  //           currentGamer: string,
  //         } = JSON.parse(localStorage.getItem('hit4n'));
  //         return { type: 'DUMY'};
  //       })
  // );

  constructor(
    private actions$: Actions
  ) {}
}
