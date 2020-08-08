import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagandoPage } from './pagando.page';

const routes: Routes = [
  {
    path: '',
    component: PagandoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagandoPageRoutingModule {}
