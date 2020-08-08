import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagandoPageRoutingModule } from './pagando-routing.module';

import { PagandoPage } from './pagando.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagandoPageRoutingModule
  ],
  declarations: [PagandoPage]
})
export class PagandoPageModule {}
