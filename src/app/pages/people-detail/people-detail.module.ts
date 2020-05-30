import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeopleDetailPageRoutingModule } from './people-detail-routing.module';

import { PeopleDetailPage } from './people-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeopleDetailPageRoutingModule
  ],
  declarations: [PeopleDetailPage]
})
export class PeopleDetailPageModule {}
