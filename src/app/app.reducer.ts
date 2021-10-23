import { ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import { Hit } from './hits/hits.model';
import * as fromHits from './hits/store/hits.reducer';

export interface State {
  hit4n: fromHits.State;
};

export const reducers: ActionReducerMap<State> = {
  hit4n: fromHits.hitsReducer
};

export const getHit4nState = createFeatureSelector<fromHits.State>('hit4n');

export const getTopTenGames = createSelector(getHit4nState, fromHits.getTopTenGames);

export const getGamer = createSelector(getHit4nState, fromHits.getGamer);

export const getOneGame = createSelector(getHit4nState, fromHits.getOneGame);

export const getIndexLastGame = createSelector(getHit4nState, fromHits.getIndexLastGame);
export const getIndex = createSelector(getHit4nState, fromHits.getIndex);
