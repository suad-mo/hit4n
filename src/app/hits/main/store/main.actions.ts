import { createAction, props } from '@ngrx/store';
import { HitGame } from '../../hits.model';

export const startGame = createAction(
  '[Main] Set New Game',
  props<{
    gamer: string;
  }>()
);

export const addHit = createAction(
  '[Main] Add New 4 Numbers',
  props<{
    nums: number[];
  }>()
);

export const updateGame = createAction(
  '[Main] Change Update New Game',
  props<{
    updateGame: HitGame;
  }>()
);

export const cancelHit = createAction(
  '[Main] Cancel Enter Numbers'
);

export const addOneNumber = createAction(
  '[Main] Enter One Number',
  props<{
    num: number;
  }>()
);

export const daleteOneNumber = createAction(
  '[Main] Delete One Mumber',
  props<{
    index: number;
    value: number;
  }>()
);

export const updateAaaa = createAction(
  '[Main] Update Aaaa props',
  props<{
    num: number;
  }>()
);

export const cancelGame = createAction(
  '[Main] Cancel New Game'
);

export const endGame = createAction(
  '[Main] End New Game',
  props<{
    finishedGame: HitGame;
  }>()
);

export const addHint = createAction(
  '[Hint] Add Hint',
  props<{
    i: number;
    j: number;
  }>()
);
