import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../app.reducer';
import * as HitsAction from './../../store/hits.actions';
import { HitGame } from '../../hits.model';

@Component({
  selector: 'app-details-game',
  templateUrl: './details-game.page.html',
  styleUrls: ['./details-game.page.scss'],
})
export class DetailsGamePage implements OnInit {
  oneGame$: Observable<HitGame>;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.State>
  ) { }

  ngOnInit() {
    this.oneGame$ = this.route.paramMap.pipe(
      switchMap(paramMap => {
        if (paramMap.has('id')) {
          this.id = +paramMap.get('id');
          this.store.dispatch(
            HitsAction.setIndexGame({
              index: this.id
            })
          );
          return this.store.select(fromApp.getOneGame);
        } else {
          return of(null);
        }
      })
    );
  }

}
