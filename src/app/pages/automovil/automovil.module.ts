import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutomovilPageRoutingModule } from './automovil-routing.module';

import { AutomovilPage } from './automovil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutomovilPageRoutingModule
  ],
  declarations: [AutomovilPage]
})
export class AutomovilPageModule {}
