import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsGamePage } from './details-game.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsGamePageRoutingModule {}
