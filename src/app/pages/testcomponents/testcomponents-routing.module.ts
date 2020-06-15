import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestcomponentsPage } from './testcomponents.page';

const routes: Routes = [
  {
    path: '',
    component: TestcomponentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestcomponentsPageRoutingModule {}
