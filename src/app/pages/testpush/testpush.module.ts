import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestpushPageRoutingModule } from './testpush-routing.module';

import { TestpushPage } from './testpush.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestpushPageRoutingModule
  ],
  declarations: [TestpushPage]
})
export class TestpushPageModule {}
