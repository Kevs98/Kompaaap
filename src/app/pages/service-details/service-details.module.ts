import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentModule } from '../../components/mapa/components.module';

import { IonicModule } from '@ionic/angular';

import { ServiceDetailsPageRoutingModule } from './service-details-routing.module';

import { ServiceDetailsPage } from './service-details.page';

@NgModule({
  imports: [  
    ComponentModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ServiceDetailsPageRoutingModule
  ],
  declarations: [ServiceDetailsPage]
})
export class ServiceDetailsPageModule {}
