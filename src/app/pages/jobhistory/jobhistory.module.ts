import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobhistoryPageRoutingModule } from './jobhistory-routing.module';

import { JobhistoryPage } from './jobhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobhistoryPageRoutingModule
  ],
  declarations: [JobhistoryPage]
})
export class JobhistoryPageModule {}
