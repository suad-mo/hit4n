import { Component, OnDestroy, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Dialog } from '@capacitor/dialog';
import { from, Observable, of, Subscription } from 'rxjs';
import { HitsService } from '../hits.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit, OnDestroy {
  currentGamer$ = new Observable<string>();
  toogleCheck = false;

  private sub: Subscription;

  constructor(
    private hitService: HitsService
  ) { }

  ngOnInit() {
    this.currentGamer$ = this.hitService.currentGamer;
  }

  onChangeGamer() {
    let currentGamer: string;
    this.sub = this.currentGamer$
      .subscribe(gamer => {
        currentGamer = gamer;
      });
    Dialog.prompt({
      title: 'Hello gamer!',
      message: `What's your name?`,
      inputText: currentGamer
    })
      .then(resData => {
        if (!resData.cancelled && resData.value) {
          this.hitService.setCurrentGamer(resData.value);
        }
      });
  };

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
