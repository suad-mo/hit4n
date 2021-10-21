import { createAction, props } from '@ngrx/store';

export const startNewGame = createAction(
  '[Main] Set New Game',
  props<{
    gamer: string;
  }>()
);

export const add4Number = createAction(
  '[Main] Add New 4 Numbers',
  props<{
    nums: number[];
  }>()
);

export const cancel4Number = createAction(
  '[Main] Cancel Enter Numbers'
);

export const enterNumber = createAction(
  '[Main] Enter One Number',
  props<{
    num: number;
  }>()
);

export const cancelNewGame = createAction(
  '[Main] Cancel New Game'
);
