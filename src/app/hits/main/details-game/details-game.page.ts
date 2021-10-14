import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { map, take } from 'rxjs/operators';
import { HitGame } from '../../hits.model';
import { HitsService } from '../../hits.service';

@Component({
  selector: 'app-details-game',
  templateUrl: './details-game.page.html',
  styleUrls: ['./details-game.page.scss'],
})
export class DetailsGamePage implements OnInit {
  hitGame: HitGame;
  xxxx: number[] = [];
  id: number;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private hitsService: HitsService
  ) {}

  ngOnInit() {
    const data = this.hitsService.getHitGame();
    if (!data || !data.hitGame) {
      this.navCtrl.navigateBack('hits/main');
      return;
    }
    this.hitGame = data.hitGame;
    this.id = data.index;
    this.xxxx = data.xxxx;
    // this.route.paramMap.subscribe((paramMap) => {
    //   if (!paramMap.has('id')) {
    //     this.navCtrl.navigateBack('hits/main');
    //     return;
    //   }
    //   this.id = +paramMap.get('id');
    //   this.hitsService.getGame(+paramMap.get('id')).subscribe((hitGame) => {
    //     if (hitGame) {
    //       this.hitGame = hitGame;
    //       console.log(this.hitGame);
    //       // this.xxxx = hitGame.hits[this.hitGame.hits.length -1].aaaa;
    //       this.xxxx = hitGame.xxxx;
    //       console.log(this.xxxx);
    //     } else {
    //       //console.log(err);
    //     this.navCtrl.navigateBack('hits/main');
    //     }
    //   }, err => {
    //     console.log(err);
    //     this.navCtrl.navigateBack('hits/main');
    //   });
    // });
  }
}
