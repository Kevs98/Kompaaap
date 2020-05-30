import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeopleDetailPage } from './people-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PeopleDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleDetailPageRoutingModule {}
