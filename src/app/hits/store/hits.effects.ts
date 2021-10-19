/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Storage } from '@capacitor/storage';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as HitsActions from './hits.actions';
import { stringify } from 'querystring';
import { HitGame } from '../hits.model';

@Injectable()
export class HitsEffects {

  constructor(
    private actions$: Actions
  ) {}

  loadHit4n$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HitsActions.loadDataLSStart),
      map(() => {
        const hit4n = JSON.parse(localStorage.getItem('hit4n')) as {
          currentGamer: string;
          topTenGames: HitGame[];
        };
        let gamer = 'New gamer';
        let topTenGames: HitGame[] = [];
        if (!hit4n) {
          return { type: 'DUMY' };
        }
        if (hit4n && hit4n.currentGamer) {
          gamer = hit4n.currentGamer;
        }
        if (hit4n && hit4n.topTenGames && hit4n.topTenGames.length > 0) {
          topTenGames = hit4n.topTenGames;
        }
        return HitsActions.loadDataLSSuccesss({
          topTenGames,
          gamer
        });
      })
    )
  );

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
}
