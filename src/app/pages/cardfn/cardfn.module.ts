import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardfnPageRoutingModule } from './cardfn-routing.module';

import { CardfnPage } from './cardfn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardfnPageRoutingModule
  ],
  declarations: [CardfnPage]
})
export class CardfnPageModule {}
