import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MandaditosPage } from './mandaditos.page';

const routes: Routes = [
  {
    path: '',
    component: MandaditosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MandaditosPageRoutingModule {}
