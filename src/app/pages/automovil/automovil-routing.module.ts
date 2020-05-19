import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutomovilPage } from './automovil.page';

const routes: Routes = [
  {
    path: '',
    component: AutomovilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomovilPageRoutingModule {}
