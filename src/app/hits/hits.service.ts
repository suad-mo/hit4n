/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HitGame } from './hits.model';

@Injectable({
  providedIn: 'root',
})
export class HitsService {
  private _gamerGames = new BehaviorSubject<{
    gamer: string;
    topTenGames: HitGame[];
  }>(null);

  constructor() {}

  get gamer() {
    return this._gamerGames.asObservable().pipe(
      map((data) => {
        if (data && data.gamer) {
          return data.gamer;
        } else {
          return null;
        }
      })
    );
  }

  get topTenGames() {
    return this._gamerGames.asObservable().pipe(
      map((data) => {
        if (data && data.topTenGames) {
          return data.topTenGames;
        } else {
          return null;
        }
      })
    );
  }

  getGame(index: number) {
    return this._gamerGames.asObservable().pipe(
      map((data) => {
        if (data && data.topTenGames) {
          return data.topTenGames[index];
        } else {
          return null;
        }
      })
    );
  }

  readStore() {
    let fetchGamer: string;
    return from(Storage.get({ key: 'gamer' })).pipe(
      switchMap((storeData) => {
        if (!storeData || !storeData.value) {
          fetchGamer = null;
        }
        fetchGamer = storeData.value;
        return from(Storage.get({ key: 'topTenGames' }));
      }),
      map((storeData) => {
        const parseTopTenGames = JSON.parse(storeData.value) as HitGame[];
        return {
          gamer: fetchGamer,
          topTenGames: parseTopTenGames,
        };
      }),
      tap((data) => {
        this._gamerGames.next({
          gamer: data.gamer,
          topTenGames: data.topTenGames,
        });
      })
    );
  }

  writeStore(gamer: string, topTenGames: HitGame[]) {
    const topTenGamesData = JSON.stringify(topTenGames);
    Storage.set({ key: 'gamer', value: gamer });
    Storage.set({ key: 'topTenGames', value: topTenGamesData });
  }
}
