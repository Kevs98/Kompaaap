import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeopleinPage } from './peoplein.page';

const routes: Routes = [
  {
    path: '',
    component: PeopleinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleinPageRoutingModule {}
