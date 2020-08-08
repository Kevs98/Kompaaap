import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PEfectivoPage } from './p-efectivo.page';

const routes: Routes = [
  {
    path: '',
    component: PEfectivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PEfectivoPageRoutingModule {}
