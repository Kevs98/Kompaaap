import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeopleinPageRoutingModule } from './peoplein-routing.module';

import { PeopleinPage } from './peoplein.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeopleinPageRoutingModule
  ],
  declarations: [PeopleinPage]
})
export class PeopleinPageModule {}
