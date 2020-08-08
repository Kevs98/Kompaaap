import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JhistorydetailPage } from './jhistorydetail.page';

const routes: Routes = [
  {
    path: '',
    component: JhistorydetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JhistorydetailPageRoutingModule {}
