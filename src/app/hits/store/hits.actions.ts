import { createAction, createSelector, props } from '@ngrx/store';
import { HitGame } from '../hits.model';

export const loadDataLSStart = createAction(
  '[Storage] Start Loading'
);

export const loadDataLSSuccesss = createAction(
  '[Storage] Loaded Success ',
  props<{
    topTenGames: HitGame[];
    gamer: string;
  }>()
);

export const loadDataLSFailed = createAction(
  '[Storage] Load Failed'
);

export const startChangeLS = createAction(
  '[Storage] Start Change Local Storage',
  props<{
    gamer?: string;
    topTenGames?: HitGame[];
  }>()
);

export const endChangeLS = createAction(
  '[Storage] End Changes',
  props<{
    gamer: string;
    topTenGames: HitGame[];
  }>()
);

export const setIndexGame = createAction(
  '[Hits] Set Index Game',
  props<{
    index: number;
  }>()
);

export const setIndexLastGame = createAction(
  '[Hits] Set Index Last Game',
  props<{
    lastIndex: number;
  }>()
);

export const addNewGameInTopTen = createAction(
  '[Storage] Add New Game In Top Ten',
  props<{
    newGame: HitGame;
  }>()
);
