import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Dialog } from '@capacitor/dialog';
import { from, Observable, of } from 'rxjs';
import { HitsService } from '../hits.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  currentGamer: string;
  toogleCheck = false;

  constructor(
    private hitService: HitsService
  ) { }

  ngOnInit() {
    this.currentGamer = this.hitService.currentGamer;
  }

  onChangeGamer() {
    Dialog.prompt({
      title: 'Hello gamer!',
      message: `What's your name?`,
      inputText: this.currentGamer
    })
    .then(resData => {
      if (!resData.cancelled && resData.value) {
        this.currentGamer = resData.value;
        this.hitService.setCurrentGamer(resData.value);
      }
    });
  };

}
