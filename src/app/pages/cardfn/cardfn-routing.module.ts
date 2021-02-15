import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardfnPage } from './cardfn.page';

const routes: Routes = [
  {
    path: '',
    component: CardfnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardfnPageRoutingModule {}
