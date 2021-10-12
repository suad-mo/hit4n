import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HitsPage } from './hits.page';

const routes: Routes = [
  {
    path: '',
    component: HitsPage,
    children: [
      {
        path: 'main',
        loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
      },
      {
        path: 'options',
        loadChildren: () => import('./options/options.module').then( m => m.OptionsPageModule)
      },
      {
        path: 'help',
        loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HitsPageRoutingModule {}
