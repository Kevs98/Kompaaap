import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/guards/auth.guard';

const routes: Routes = [
  { 
    path: '', redirectTo: 'login', pathMatch: 'full' 
  },
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/kompa-detail/kompa-detail.module').then( m => m.KompaDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'details', 
    loadChildren: () => import('./pages/kompa-detail/kompa-detail.module').then( m => m.KompaDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'employees',
    loadChildren: () => import('./pages/employees/employees.module').then( m => m.EmployeesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'automovil',
    loadChildren: () => import('./pages/automovil/automovil.module').then( m => m.AutomovilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'peoplein/:id',
    loadChildren: () => import('./pages/peoplein/peoplein.module').then( m => m.PeopleinPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'peoplein',
    loadChildren: () => import('./pages/peoplein/peoplein.module').then( m => m.PeopleinPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'people-detail',
    loadChildren: () => import('./pages/people-detail/people-detail.module').then( m => m.PeopleDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'people-detail/:id',
    loadChildren: () => import('./pages/people-detail/people-detail.module').then( m => m.PeopleDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'active-service',
    loadChildren: () => import('./pages/active-service/active-service.module').then( m => m.ActiveServicePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'delivery',
    loadChildren: () => import('./pages/delivery/delivery.module').then( m => m.DeliveryPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vipservices',
    loadChildren: () => import('./pages/vipservices/vipservices.module').then( m => m.VipservicesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'service-details',
    loadChildren: () => import('./pages/service-details/service-details.module').then( m => m.ServiceDetailsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'service-details/:id',
    loadChildren: () => import('./pages/service-details/service-details.module').then( m => m.ServiceDetailsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'deliverydetail',
    loadChildren: () => import('./pages/deliverydetail/deliverydetail.module').then( m => m.DeliverydetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'deliverydetail/:id',
    loadChildren: () => import('./pages/deliverydetail/deliverydetail.module').then( m => m.DeliverydetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'testcomponents',
    loadChildren: () => import('./pages/testcomponents/testcomponents.module').then( m => m.TestcomponentsPageModule)
  },
  {
    path: 'testmapa',
    loadChildren: () => import('./pages/testmapa/testmapa.module').then( m => m.TestmapaPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
