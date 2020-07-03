import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentModule } from '../../components/mapa/components.module';

import { IonicModule } from '@ionic/angular';

import { DeliverydetailPageRoutingModule } from './deliverydetail-routing.module';

import { DeliverydetailPage } from './deliverydetail.page';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';

@NgModule({
  imports: [
    ComponentModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverydetailPageRoutingModule
  ],
  declarations: [DeliverydetailPage],
  providers: [ GoogleMaps ]
})
export class DeliverydetailPageModule {}
