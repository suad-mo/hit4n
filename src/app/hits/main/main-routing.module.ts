import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { MainPage } from './main.page';
import { mainReducer } from './store/main.reducer';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'games/:id',
    loadChildren: () => import('./details-game/details-game.module').then( m => m.DetailsGamePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('main', mainReducer)
  ],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
