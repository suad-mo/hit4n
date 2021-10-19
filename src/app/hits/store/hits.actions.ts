import { createAction, props } from '@ngrx/store';
import { HitGame } from '../hits.model';

export const loadDataLSStart = createAction(
  '[Hits] Start Loading Local Storage Data'
);

export const loadDataLSSuccesss = createAction(
  '[Hits] Loaded Local Storage Data Success ',
  props<{
    topTenGames: HitGame[];
    gamer: string;
  }>()
);
