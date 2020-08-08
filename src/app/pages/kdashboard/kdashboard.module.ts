import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KdashboardPageRoutingModule } from './kdashboard-routing.module';

import { KdashboardPage } from './kdashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KdashboardPageRoutingModule
  ],
  declarations: [KdashboardPage]
})
export class KdashboardPageModule {}
