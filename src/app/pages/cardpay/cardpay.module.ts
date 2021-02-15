import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardpayPageRoutingModule } from './cardpay-routing.module';

import { CardpayPage } from './cardpay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardpayPageRoutingModule
  ],
  declarations: [CardpayPage]
})
export class CardpayPageModule {}
