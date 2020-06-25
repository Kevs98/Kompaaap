import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestmapaPageRoutingModule } from './testmapa-routing.module';

import { TestmapaPage } from './testmapa.page';

import { ComponentModule } from '../../components/mapa/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    IonicModule,
    TestmapaPageRoutingModule
  ],
  declarations: [TestmapaPage]
})
export class TestmapaPageModule {}
