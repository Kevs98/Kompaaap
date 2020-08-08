import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuRestaurantsPageRoutingModule } from './menu-restaurants-routing.module';

import { MenuRestaurantsPage } from './menu-restaurants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuRestaurantsPageRoutingModule
  ],
  declarations: [MenuRestaurantsPage]
})
export class MenuRestaurantsPageModule {}
