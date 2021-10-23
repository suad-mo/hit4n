/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Storage } from '@capacitor/storage';
import * as fromApp from '../../app.reducer';
import * as HitsActions from './hits.actions';

import { map, switchMap, take, tap } from 'rxjs/operators';

import { HitGame } from '../hits.model';
import { Store } from '@ngrx/store';

const setHit4n = async (currentGamer: string, topTenGames: HitGame[]) => {
  const hit4n = {
    currentGamer,
    topTenGames,
  };
  const strHit4n = JSON.stringify(hit4n);
  await Storage.set({
    key: 'hit4n',
    value: strHit4n,
  });
};

@Injectable()
export class HitsEffects {
  loadHit4n$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HitsActions.loadDataLSStart),
      switchMap(async () => {
        const { value } = await Storage.get({ key: 'hit4n' });
        const hit4n = JSON.parse(value) as unknown as {
          currentGamer: string;
          topTenGames: HitGame[];
        };
        if (!hit4n) {
          return HitsActions.loadDataLSFailed();
        }
        const gamer = hit4n.currentGamer;
        const topTenGames = hit4n.topTenGames as HitGame[];
        return HitsActions.loadDataLSSuccesss({
          topTenGames,
          gamer
        });
      })
    )
  );

  changeLS$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HitsActions.startChangeLS),
      switchMap((action) => {
        return this.store.select('hit4n').pipe(
          take(1),
          map((data) => {
            let gamer = data.gamer;
            let topTenGames = [...data.topTenGames];
            if (action.gamer !== undefined) {
              gamer = action.gamer;
            }
            if (action.topTenGames !== undefined) {
              topTenGames = [...action.topTenGames];
            }
            setHit4n(gamer, topTenGames);
            return HitsActions.endChangeLS({
              gamer,
              topTenGames
            });
          })
        );
      })
    )
  );

  addNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HitsActions.addNewGameInTopTen),
      switchMap((action) => {
        return this.store.select(fromApp.getTopTenGames).pipe(
          take(1),
          map(data => {
            const topTenGames = [...data];
            let isUpdateTopTen = false;
            let lastIndex = -1;
            if (topTenGames.length <= 9) {
              topTenGames.push(action.newGame);
              topTenGames.sort((a, b) => a.duration - b.duration);
              isUpdateTopTen = true;
            } else {
              if (topTenGames[9].duration > action.newGame.duration) {
                topTenGames[9] = action.newGame;
                topTenGames.sort((a, b) => a.duration - b.duration);
                isUpdateTopTen = true;
              }
            }
            if (isUpdateTopTen) {
              lastIndex = topTenGames.findIndex(hitGame =>
                hitGame.duration === action.newGame.duration
              );
              this.store.dispatch(HitsActions.startChangeLS({
                topTenGames
              }));
              return HitsActions.setIndexLastGame({
                lastIndex
              });
            }
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.State>
  ) { }
}
