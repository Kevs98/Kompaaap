import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestmapaPage } from './testmapa.page';

const routes: Routes = [
  {
    path: '',
    component: TestmapaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestmapaPageRoutingModule {}
