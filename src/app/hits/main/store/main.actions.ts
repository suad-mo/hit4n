import { createAction, props } from '@ngrx/store';

export const startNewGame = createAction(
  '[Main] Set New Game',
  props<{
    gamer: string;
  }>()
);

export const add4Number = createAction(
  '[Main] Add new 4 numbers',
  props<{
    nums: number[];
  }>()
);

export const enterNumber = createAction(
  '[Main] Enter number',
  props<{
    num: number;
  }>()
);
