import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

import * as fromApp from '../../../app.reducer';
import * as fromMain from './main.reducer';
import * as MainActions from './main.actions';
import * as HitsAction from '../../store/hits.actions';
import { from } from 'rxjs';

@Injectable()
export class MainEffcts {
  endGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MainActions.endGame),
      switchMap(async (actions) => HitsAction.addNewGameInTopTen({
          newGame: actions.finishedGame
        })
        // HitsAction.addNewGameInTopTen({
        //   newGame: actions.finishedGame,
        // })
      ),
      tap((data) => console.log('Effect end GAme......', data)
      )
    )
  );

  // addOneNumber$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(MainActions.addOneNumber),
  //     switchMap((action) => ))
  // ));

  constructor(
    private actions$: Actions,
    private store: Store<fromMain.mainState>
  ) {}
}
