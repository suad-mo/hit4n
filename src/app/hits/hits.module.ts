import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HitsPageRoutingModule } from './hits-routing.module';

import { HitsPage } from './hits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HitsPageRoutingModule
  ],
  declarations: [HitsPage]
})
export class HitsPageModule {}
