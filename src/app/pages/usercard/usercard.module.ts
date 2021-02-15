import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsercardPageRoutingModule } from './usercard-routing.module';

import { UsercardPage } from './usercard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsercardPageRoutingModule
  ],
  declarations: [UsercardPage]
})
export class UsercardPageModule {}
