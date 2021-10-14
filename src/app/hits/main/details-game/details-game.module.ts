import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsGamePageRoutingModule } from './details-game-routing.module';

import { DetailsGamePage } from './details-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsGamePageRoutingModule
  ],
  declarations: [DetailsGamePage]
})
export class DetailsGamePageModule {}
