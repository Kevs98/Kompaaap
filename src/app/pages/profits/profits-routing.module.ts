import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfitsPage } from './profits.page';

const routes: Routes = [
  {
    path: '',
    component: ProfitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfitsPageRoutingModule {}
