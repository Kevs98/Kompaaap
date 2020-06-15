import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverydetailPage } from './deliverydetail.page';

const routes: Routes = [
  {
    path: '',
    component: DeliverydetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverydetailPageRoutingModule {}
