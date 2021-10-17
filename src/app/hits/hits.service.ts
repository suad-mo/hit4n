/* eslint-disable no-underscore-dangle */
import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { HitGame } from './hits.model';
import * as data from '../../assets/data/top-ten-games';

const TOPTEN: HitGame[] = data.topTenGames as unknown as HitGame[];
@Injectable({
  providedIn: 'root',
})
export class HitsService {
  topTenGames: HitGame[] = [];
  currentGamer = 'New gamer';

  constructor() { }

  setTopTenGames(hitGames: HitGame[]) {
    this.topTenGames = hitGames;
    this.setGamerAndTopTenGames(this.currentGamer, hitGames);
  }

  getOneGame(index: number) {
    return this.topTenGames[index];
  }

  setCurrentGamer(currentGamer: string) {
    this.currentGamer = currentGamer;
    this.setGamerAndTopTenGames(currentGamer, this.topTenGames);
  }

  checkGamerAndTopTenGames = async () => {
    const { value } = await Storage.get({ key: 'hit4n' });
    const hit4n = JSON.parse(value) as {
      currentGamer: string;
      topTenGames: HitGame[];
    };
    if (hit4n && hit4n.currentGamer) {
      this.currentGamer = hit4n.currentGamer;
    } else {
      this.currentGamer = 'Guest';
    }
    if (hit4n && hit4n.topTenGames) {
      this.topTenGames = hit4n.topTenGames;
    } else {
      this.topTenGames = TOPTEN;
    }
  };

  setGamerAndTopTenGames = async (currentGamer: string, topTenGames: HitGame[]) => {
    const gamerAndTopTenGames = {
      currentGamer,
      topTenGames
    };
    const hit4n = JSON.stringify(gamerAndTopTenGames);
    await Storage.set({
      key: 'hit4n',
      value: hit4n
    });
  };
}
