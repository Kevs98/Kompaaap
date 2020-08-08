import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JhistorydetailPageRoutingModule } from './jhistorydetail-routing.module';

import { JhistorydetailPage } from './jhistorydetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JhistorydetailPageRoutingModule
  ],
  declarations: [JhistorydetailPage]
})
export class JhistorydetailPageModule {}
