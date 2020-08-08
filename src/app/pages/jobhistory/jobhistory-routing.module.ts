import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobhistoryPage } from './jobhistory.page';

const routes: Routes = [
  {
    path: '',
    component: JobhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobhistoryPageRoutingModule {}
