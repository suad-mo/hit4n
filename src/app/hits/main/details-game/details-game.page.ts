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
  aaaa: number[] = [];
  id: number;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private hitsService: HitsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('hits/main');
        return;
      }
      this.id = +paramMap.get('id');
      this.hitGame = this.hitsService.getOneGame(+paramMap.get('id'));
      if (this.hitGame.hits.length > 0) {
        this.aaaa = this.hitGame.hits[this.hitGame.hits.length - 1].aaaa.map(a => a.a);
      }
    });
  }
}
