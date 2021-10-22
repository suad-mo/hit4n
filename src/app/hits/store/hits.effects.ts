/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { Storage } from '@capacitor/storage';
import * as fromApp from '../../app.reducer';
import * as HitsActions from './hits.actions';

import { map, switchMap, take, tap } from 'rxjs/operators';

import { HitGame } from '../hits.model';
import { Store } from '@ngrx/store';

const setHit4n = async (currentGamer: string, topTenGamesames: HitGame[]) => {
  const hit4n = {
    currentGamer,
    topTenGamesames,
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
        // if (hit4n.currentGamer) {
        //   gamer = hit4n.currentGamer;
        // }
        const topTenGames = hit4n.topTenGames as HitGame[];
        console.log('hit4n...', hit4n);
        console.log('Current Gamer...', gamer);
        // if (hit4n.topTenGames && hit4n.topTenGames.length > 0) {
        //   topTenGames = [...hit4n.topTenGames];
        // }
        console.log('Tpten games...', topTenGames);
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
            // this.store.dispatch(HitsActions.endChangeLS({
            //   gamer,
            //   topTenGames
            // }));
            return HitsActions.endChangeLS({
              gamer,
              topTenGames,
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
            let index = -1;
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
              index = topTenGames.findIndex(hitGame =>
                hitGame.duration === action.newGame.duration
              );
              this.store.dispatch(HitsActions.startChangeLS({
                topTenGames
              }));
              return HitsActions.setIndexGame({
                index
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
