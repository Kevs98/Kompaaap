import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PEfectivoPageRoutingModule } from './p-efectivo-routing.module';

import { PEfectivoPage } from './p-efectivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PEfectivoPageRoutingModule
  ],
  declarations: [PEfectivoPage]
})
export class PEfectivoPageModule {}
