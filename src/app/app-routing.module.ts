import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', redirectTo: 'categories', pathMatch: 'full' 
  },
  { 
    path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
