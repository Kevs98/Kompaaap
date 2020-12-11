import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperdetailsPage } from './superdetails.page';

const routes: Routes = [
  {
    path: '',
    component: SuperdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperdetailsPageRoutingModule {}
