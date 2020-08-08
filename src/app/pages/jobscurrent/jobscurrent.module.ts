import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobscurrentPageRoutingModule } from './jobscurrent-routing.module';

import { JobscurrentPage } from './jobscurrent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobscurrentPageRoutingModule
  ],
  declarations: [JobscurrentPage]
})
export class JobscurrentPageModule {}
