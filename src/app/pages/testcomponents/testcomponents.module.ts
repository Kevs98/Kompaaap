import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from '../../components/mapa/components.module';
import { MComponentModule } from '../../components/mapa-native/mcomponent.module';
import { AgmCoreModule } from '@agm/core';
import { GoogleMaps } from '@ionic-native/google-maps';

import { IonicModule } from '@ionic/angular';

import { TestcomponentsPageRoutingModule } from './testcomponents-routing.module';

import { TestcomponentsPage } from './testcomponents.page';
import { from } from 'rxjs';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    MComponentModule,
    TestcomponentsPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCPtK1KCnD_dRdoqU3LxOupROGVdAddzJE', 
      libraries: ['places']
    })
  ],
  declarations: [TestcomponentsPage],
  providers: [ GoogleMaps ]
})
export class TestcomponentsPageModule {}
