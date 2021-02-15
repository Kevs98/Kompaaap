import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsercardPage } from './usercard.page';

const routes: Routes = [
  {
    path: '',
    component: UsercardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsercardPageRoutingModule {}
