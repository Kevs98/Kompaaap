import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobscurrentPage } from './jobscurrent.page';

const routes: Routes = [
  {
    path: '',
    component: JobscurrentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobscurrentPageRoutingModule {}
