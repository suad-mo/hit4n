/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Storage } from '@capacitor/storage';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as HitsActions from './hits.actions';

import { HitGame } from '../hits.model';
import { Capacitor } from '@capacitor/core';

@Injectable()
export class HitsEffects {


  loadHit4n$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HitsActions.loadDataLSStart),
      switchMap(async () => {
        const { value } = await Storage.get({ key: 'hit4n' });
        const hit4n = JSON.parse(value) as {
          currentGamer: string;
          topTenGames: HitGame[];
        };
        if (!hit4n) {
          return HitsActions.loadDataLSFailed();
        }
        let gamer = 'New gamer';
        if (hit4n.currentGamer) {
          gamer = hit4n.currentGamer;
        }
        let topTenGames: HitGame[] = [];
        if (hit4n.topTenGames && hit4n.topTenGames.length > 0) {
          topTenGames = [...hit4n.topTenGames];
        }
        return HitsActions.loadDataLSSuccesss({
          topTenGames,
          gamer
        });
      })
    )
  );

  // changeGamer$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(HitsActions.changeGamer),
  //       switchMap((action) => {
  //         console.log(action.gamer);
  //         return { type: 'DUMY'};
  //       })
  //     )
  // );

  constructor(
    private actions$: Actions
  ) { }
}

// loadHit4n$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(HitsActions.loadDataLSStart),
//       tap(() => {
//         console.log('ajajajajajaj');
//       }),
//       map(() => {
//         const hit4n = JSON.parse(localStorage.getItem('hit4n')) as {
//           currentGamer: string;
//           topTenGames: HitGame[];
//         };
//         let gamer = 'New gamer';
//         let topTenGames: HitGame[] = [];
//         if (!hit4n) {
//           return { type: 'DUMY' };
//         }
//         if (hit4n.currentGamer) {
//           gamer = hit4n.currentGamer;
//         }
//         if (hit4n.topTenGames && hit4n.topTenGames.length > 0) {
//           topTenGames = [...hit4n.topTenGames];
//         }
//         return HitsActions.loadDataLSSuccesss({
//           topTenGames,
//           gamer
//         });
//       })
//     )
//   );
