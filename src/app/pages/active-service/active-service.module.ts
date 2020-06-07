import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveServicePageRoutingModule } from './active-service-routing.module';

import { ActiveServicePage } from './active-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveServicePageRoutingModule
  ],
  declarations: [ActiveServicePage]
})
export class ActiveServicePageModule {}
