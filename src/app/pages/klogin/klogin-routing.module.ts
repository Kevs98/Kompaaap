import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KloginPage } from './klogin.page';

const routes: Routes = [
  {
    path: '',
    component: KloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KloginPageRoutingModule {}
