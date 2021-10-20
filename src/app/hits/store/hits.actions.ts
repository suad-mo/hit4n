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
  '[Storage End Changes]',
  props<{
    gamer: string;
    topTenGames: HitGame[];
  }>()
);

export const setIndexGame = createAction(
  'Set Index Curent Game',
  props<{
    index: number;
  }>()
);
