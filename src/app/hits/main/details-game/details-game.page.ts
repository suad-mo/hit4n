import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, of, Subscription } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { HitGame } from '../../hits.model';
import { HitsService } from '../../hits.service';

@Component({
  selector: 'app-details-game',
  templateUrl: './details-game.page.html',
  styleUrls: ['./details-game.page.scss'],
})
export class DetailsGamePage implements OnInit, OnDestroy {
  hitGame$: Observable<HitGame>;
  xxxx$: Observable<number[]>;
  hitGame: HitGame;
  xxxx: number[] = [];
  id: number;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private hitsService: HitsService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(paramMap => {
        if (paramMap.has('id')) {
          const id = +paramMap.get('id');
          this.id = id;
          return this.hitsService.getOneGame(id);
        } else {
          return of(null);
        }
      })).subscribe(hitGame => {
        if ((typeof hitGame) === 'object') {
          this.hitGame = hitGame as HitGame;
          const last = this.hitGame.hits.length - 1;
          this.xxxx = this.hitGame.hits[last].aaaa.map(a => a.a);
        } else {
          this.navCtrl.navigateBack('hits/main');
        }
      });
  }


  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
