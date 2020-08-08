import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KloginPageRoutingModule } from './klogin-routing.module';

import { KloginPage } from './klogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KloginPageRoutingModule
  ],
  declarations: [KloginPage]
})
export class KloginPageModule {}
