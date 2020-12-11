import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveordersPageRoutingModule } from './activeorders-routing.module';

import { ActiveordersPage } from './activeorders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveordersPageRoutingModule
  ],
  declarations: [ActiveordersPage]
})
export class ActiveordersPageModule {}
