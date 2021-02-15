import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestpushPage } from './testpush.page';

const routes: Routes = [
  {
    path: '',
    component: TestpushPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestpushPageRoutingModule {}
