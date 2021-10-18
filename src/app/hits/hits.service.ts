/* eslint-disable no-underscore-dangle */
import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { HitGame } from './hits.model';
import * as data from '../../assets/data/top-ten-games';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

const TOPTEN: HitGame[] = data.topTenGames as unknown as HitGame[];
@Injectable({
  providedIn: 'root',
})
export class HitsService {
  private _topTenGames = new BehaviorSubject<HitGame[]>([]);
  private _currentGamer = new BehaviorSubject<string>('New gamer');

  constructor(
    private toastCtrl: ToastController
  ) { }

  get topTenGames() {
    return this._topTenGames.asObservable();
  }

  get currentGamer() {
    return this._currentGamer.asObservable();
  }

  setTopTenGames(hitGames: HitGame[]) {
    this.setGamerAndTopTenGames(this._currentGamer.getValue(), hitGames);
  }

  getOneGame(index: number) {
    return of(this._topTenGames.getValue()[index]);
  }

  setCurrentGamer(currentGamer: string) {
    this.setGamerAndTopTenGames(currentGamer, this._topTenGames.getValue());
  }

  clearTopTenGames() {
    this.setGamerAndTopTenGames(this._currentGamer.getValue(), []);
  }

  onLoadTopTenGames() {
    this.setGamerAndTopTenGames(this._currentGamer.getValue(), TOPTEN);
  }

  checkGamerAndTopTenGames = async () => {
    const { value } = await Storage.get({ key: 'hit4n' });
    const hit4n = JSON.parse(value) as {
      currentGamer: string;
      topTenGames: HitGame[];
    };
    if (hit4n && hit4n.currentGamer) {
      this._currentGamer.next(hit4n.currentGamer);
    } else {
      this._currentGamer.next('Guest');
    }
    if (hit4n && hit4n.topTenGames && hit4n.topTenGames.length > 0) {
      this._topTenGames.next(hit4n.topTenGames);
    } else {
      this._topTenGames.next([]);
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
    }).then(() => {
      this._currentGamer.next(currentGamer);
      this._topTenGames.next(topTenGames);
    });
  };
}
