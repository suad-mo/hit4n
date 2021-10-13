import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewGameComponent } from './new-game/new-game.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  gamer = 'Suad';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onStartNewGame() {
    console.log('Početak igre...');
    this.openNewGameModal();
  }

  private openNewGameModal() {
    this.modalCtrl
      .create({
        component: NewGameComponent,
        componentProps: {
          gamer: this.gamer,
        }
        //presentingElement: this.modalCtrl.getTop()
        , animated: true
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resData => {
        console.log(resData);
      });
  }

}
