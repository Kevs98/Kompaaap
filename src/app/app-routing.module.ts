import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', redirectTo: 'categories', pathMatch: 'full' 
  },
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/kompa-detail/kompa-detail.module').then( m => m.KompaDetailPageModule)
  },
  {
    path: 'details', 
    loadChildren: () => import('./pages/kompa-detail/kompa-detail.module').then( m => m.KompaDetailPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./pages/employees/employees.module').then( m => m.EmployeesPageModule)
  },
  {
    path: 'automovil',
    loadChildren: () => import('./pages/automovil/automovil.module').then( m => m.AutomovilPageModule)
  },
  {
    path: 'service-details/:id',
    loadChildren: () => import('./pages/service-details/service-details.module').then( m => m.ServiceDetailsPageModule)
  },
  {
    path: 'service-details',
    loadChildren: () => import('./pages/service-details/service-details.module').then( m => m.ServiceDetailsPageModule)
  },
  {
    path: 'peoplein/:id',
    loadChildren: () => import('./pages/peoplein/peoplein.module').then( m => m.PeopleinPageModule)
  },
  {
    path: 'peoplein',
    loadChildren: () => import('./pages/peoplein/peoplein.module').then( m => m.PeopleinPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'people-detail',
    loadChildren: () => import('./pages/people-detail/people-detail.module').then( m => m.PeopleDetailPageModule)
  },
  {
    path: 'people-detail/:id',
    loadChildren: () => import('./pages/people-detail/people-detail.module').then( m => m.PeopleDetailPageModule)
  },
  {
    path: 'active-service',
    loadChildren: () => import('./pages/active-service/active-service.module').then( m => m.ActiveServicePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
