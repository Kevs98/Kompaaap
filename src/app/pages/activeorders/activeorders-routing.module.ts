import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveordersPage } from './activeorders.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveordersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveordersPageRoutingModule {}
