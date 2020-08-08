import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuRestaurantsPage } from './menu-restaurants.page';

const routes: Routes = [
  {
    path: '',
    component: MenuRestaurantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRestaurantsPageRoutingModule {}
