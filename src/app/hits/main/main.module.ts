import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { NewGameComponent } from './new-game/new-game.component';
import { KeyboardComponent } from './new-game/keyboard/keyboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule
  ],
  declarations: [MainPage, NewGameComponent, KeyboardComponent]
})
export class MainPageModule {}
