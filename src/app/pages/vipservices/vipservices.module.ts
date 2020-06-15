import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VipservicesPageRoutingModule } from './vipservices-routing.module';

import { VipservicesPage } from './vipservices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VipservicesPageRoutingModule
  ],
  declarations: [VipservicesPage]
})
export class VipservicesPageModule {}
