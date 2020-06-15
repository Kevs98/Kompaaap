import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentModule } from '../../components/mapa/components.module';
import { MComponentModule } from '../../components/mapa-native/mcomponent.module';

import { IonicModule } from '@ionic/angular';

import { TestcomponentsPageRoutingModule } from './testcomponents-routing.module';

import { TestcomponentsPage } from './testcomponents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    MComponentModule,
    TestcomponentsPageRoutingModule
  ],
  declarations: [TestcomponentsPage]
})
export class TestcomponentsPageModule {}
