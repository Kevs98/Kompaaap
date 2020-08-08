import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KdashboardPage } from './kdashboard.page';

const routes: Routes = [
  {
    path: '',
    component: KdashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KdashboardPageRoutingModule {}
