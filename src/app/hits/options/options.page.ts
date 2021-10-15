import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Dialog } from '@capacitor/dialog';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  gamer = 'Guest';

  constructor() { }

  ngOnInit() {
    this.checkGamer();
  }

  checkGamer = async () => {
    const { value } = await Storage.get({ key: 'gamer' });
    if (value) {
      this.gamer = value;
    }
  };

  onChangeGamer = async () => {
    const { value, cancelled } = await Dialog.prompt({
      title: 'Hello gamer!',
      message: `What's your name?`,
      inputText: this.gamer
    });
    if (!cancelled && value && (this.gamer !== value)) {
      this.gamer = value;
      Storage.set({ key: 'gamer', value });
    }
  };

}
