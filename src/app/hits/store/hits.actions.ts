import { createAction, props } from '@ngrx/store';
import { HitGame } from '../hits.model';

export const loadDataLSStart = createAction(
  '[Hits] Start Loading Local Storage Data',
  props<{
    isLoad: boolean;
  }>()
);

export const loadDataLSSuccesss = createAction(
  '[Hits] Loaded Local Storage Data Success ',
  props<{
    hitGames: HitGame[];
    gamer: string;
    isLoading: boolean;
  }>()
);
