import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KompaDetailPageRoutingModule } from './kompa-detail-routing.module';

import { KompaDetailPage } from './kompa-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KompaDetailPageRoutingModule
  ],
  declarations: [KompaDetailPage]
})
export class KompaDetailPageModule {}
