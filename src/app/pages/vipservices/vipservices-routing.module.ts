import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VipservicesPage } from './vipservices.page';

const routes: Routes = [
  {
    path: '',
    component: VipservicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VipservicesPageRoutingModule {}
