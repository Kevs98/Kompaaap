import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentModule } from '../../components/mapa/components.module';

import { IonicModule } from '@ionic/angular';

import { PeopleDetailPageRoutingModule } from './people-detail-routing.module';

import { PeopleDetailPage } from './people-detail.page';
import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  imports: [
    ComponentModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PeopleDetailPageRoutingModule
  ],
  declarations: [PeopleDetailPage],
  providers: [
    GoogleMaps
  ]
})
export class PeopleDetailPageModule {}
