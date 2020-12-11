import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MandaditosPageRoutingModule } from './mandaditos-routing.module';

import { MandaditosPage } from './mandaditos.page';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MandaditosPageRoutingModule
  ],
  declarations: [MandaditosPage],
  providers: [ GoogleMaps ]
})
export class MandaditosPageModule {}
