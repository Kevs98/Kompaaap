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
    // canActivate: [AuthGuard]
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/kompa-detail/kompa-detail.module').then( m => m.KompaDetailPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'details', 
    loadChildren: () => import('./pages/kompa-detail/kompa-detail.module').then( m => m.KompaDetailPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'employees',
    loadChildren: () => import('./pages/employees/employees.module').then( m => m.EmployeesPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'automovil',
    loadChildren: () => import('./pages/automovil/automovil.module').then( m => m.AutomovilPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'peoplein/:id/:rid',
    loadChildren: () => import('./pages/peoplein/peoplein.module').then( m => m.PeopleinPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'peoplein/:id/:rid/:suma/:from/:name', 
    loadChildren: () => import('./pages/peoplein/peoplein.module').then( m => m.PeopleinPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'peoplein/:id/:rid/:precio/:cant/:tipo/:from/:name',
    loadChildren: () => import('./pages/peoplein/peoplein.module').then( m => m.PeopleinPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'peoplein/:id/:rid/:precio/:cant/:tipo',
    loadChildren: () => import('./pages/peoplein/peoplein.module').then( m => m.PeopleinPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'peoplein/:id/:rid/:precio',
    loadChildren: () => import('./pages/peoplein/peoplein.module').then( m => m.PeopleinPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'peoplein/:id/:tipo',
    loadChildren: () => import('./pages/peoplein/peoplein.module').then( m => m.PeopleinPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'peoplein/:id',
    loadChildren: () => import('./pages/peoplein/peoplein.module').then( m => m.PeopleinPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'peoplein/:id/:origin/:destination/:desc/:preciosp',
    loadChildren: () => import('./pages/peoplein/peoplein.module').then( m => m.PeopleinPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'peoplein',
    loadChildren: () => import('./pages/peoplein/peoplein.module').then( m => m.PeopleinPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'people-detail',
    loadChildren: () => import('./pages/people-detail/people-detail.module').then( m => m.PeopleDetailPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'people-detail/:id',
    loadChildren: () => import('./pages/people-detail/people-detail.module').then( m => m.PeopleDetailPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'active-service',
    loadChildren: () => import('./pages/active-service/active-service.module').then( m => m.ActiveServicePageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'delivery',
    loadChildren: () => import('./pages/delivery/delivery.module').then( m => m.DeliveryPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'vipservices',
    loadChildren: () => import('./pages/vipservices/vipservices.module').then( m => m.VipservicesPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'service-details',
    loadChildren: () => import('./pages/service-details/service-details.module').then( m => m.ServiceDetailsPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'service-details/:id',
    loadChildren: () => import('./pages/service-details/service-details.module').then( m => m.ServiceDetailsPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'deliverydetail',
    loadChildren: () => import('./pages/deliverydetail/deliverydetail.module').then( m => m.DeliverydetailPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'deliverydetail/:id/:rid/:oid/:precio/:cant',
    loadChildren: () => import('./pages/deliverydetail/deliverydetail.module').then( m => m.DeliverydetailPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'deliverydetail/:id/:rid/:oid/:precio/:from/:tipo/:name',
    loadChildren: () => import('./pages/deliverydetail/deliverydetail.module').then( m => m.DeliverydetailPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'deliverydetail/:id/:rid/:oid/:suma/:from/:name',
    loadChildren: () => import('./pages/deliverydetail/deliverydetail.module').then( m => m.DeliverydetailPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'deliverydetail/:id/:rid/:tipo',
    loadChildren: () => import('./pages/deliverydetail/deliverydetail.module').then( m => m.DeliverydetailPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'deliverydetail/:id/:rid',
    loadChildren: () => import('./pages/deliverydetail/deliverydetail.module').then( m => m.DeliverydetailPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'deliverydetail/:id/:pid/:origin/:destination',
    loadChildren: () => import('./pages/deliverydetail/deliverydetail.module').then( m => m.DeliverydetailPageModule),
    // canActivate: [AuthGuard]
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
  },
  {
    path: 'pagos',
    loadChildren: () => import('./pages/pagos/pagos.module').then( m => m.PagosPageModule)
  },
  {
    path: 'menu-restaurants',
    loadChildren: () => import('./pages/menu-restaurants/menu-restaurants.module').then( m => m.MenuRestaurantsPageModule)
  },
  {
    path: 'menu-restaurants/:id',
    loadChildren: () => import('./pages/menu-restaurants/menu-restaurants.module').then( m => m.MenuRestaurantsPageModule)
  },
  {
    path: 'detalle-producto',
    loadChildren: () => import('./pages/detalle-producto/detalle-producto.module').then( m => m.DetalleProductoPageModule)
  },
  {
    path: 'detalle-producto/:id',
    loadChildren: () => import('./pages/detalle-producto/detalle-producto.module').then( m => m.DetalleProductoPageModule)
  },
  {
    path: 'detalle-producto/:id/:rid',
    loadChildren: () => import('./pages/detalle-producto/detalle-producto.module').then( m => m.DetalleProductoPageModule)
  },
  {
    path: 'pagando',
    loadChildren: () => import('./pages/pagando/pagando.module').then( m => m.PagandoPageModule)
  },
  {
    path: 'pagando/:id',
    loadChildren: () => import('./pages/pagando/pagando.module').then( m => m.PagandoPageModule)
  },
  {
    path: 'pagando/:id/:super',
    loadChildren: () => import('./pages/pagando/pagando.module').then( m => m.PagandoPageModule)
  },
  {
    path: 'pagando/:id/:super/:origen/:dest/:desc/:price',
    loadChildren: () => import('./pages/pagando/pagando.module').then( m => m.PagandoPageModule)
  },
  {
    path: 'pagando/:id/:rid/:precio/:cant',
    loadChildren: () => import('./pages/pagando/pagando.module').then( m => m.PagandoPageModule)
  },
  {
    path: 'pagando/:pid/:id/:origin/:destination',
    loadChildren: () => import('./pages/pagando/pagando.module').then( m => m.PagandoPageModule)
  },
  {
    path: 'pagando/:id/:rid/:precio/:from/:name',
    loadChildren: () => import('./pages/pagando/pagando.module').then( m => m.PagandoPageModule)
  },
  {
    path: 'p-efectivo',
    loadChildren: () => import('./pages/p-efectivo/p-efectivo.module').then( m => m.PEfectivoPageModule)
  },
  {
    path: 'p-efectivo/:id',
    loadChildren: () => import('./pages/p-efectivo/p-efectivo.module').then( m => m.PEfectivoPageModule)
  },
  {
    path: 'p-efectivo/:id/:super/:price',
    loadChildren: () => import('./pages/p-efectivo/p-efectivo.module').then( m => m.PEfectivoPageModule)
  },
  {
    path: 'p-efectivo/:id/:rid/:precio/:cant',
    loadChildren: () => import('./pages/p-efectivo/p-efectivo.module').then( m => m.PEfectivoPageModule)
  },
  {
    path: 'p-efectivo/:id/:rid/:precio/:from/:name',
    loadChildren: () => import('./pages/p-efectivo/p-efectivo.module').then( m => m.PEfectivoPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'carrito/:id',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },   {
    path: 'conductor',
    loadChildren: () => import('./pages/conductor/conductor.module').then( m => m.ConductorPageModule)
  },
  {
    path: 'conductor',
    loadChildren: () => import('./pages/conductor/conductor.module').then( m => m.ConductorPageModule)
  },
  {
    path: 'klogin',
    loadChildren: () => import('./pages/klogin/klogin.module').then( m => m.KloginPageModule)
  },
  {
    path: 'kdashboard',
    loadChildren: () => import('./pages/kdashboard/kdashboard.module').then( m => m.KdashboardPageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./pages/editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'jobscurrent',
    loadChildren: () => import('./pages/jobscurrent/jobscurrent.module').then( m => m.JobscurrentPageModule)
  },
  {
    path: 'jobdetail',
    loadChildren: () => import('./pages/jobdetail/jobdetail.module').then( m => m.JobdetailPageModule)
  },
  {
    path: 'jobdetail/:id/:ubi/:phone/:cub',
    loadChildren: () => import('./pages/jobdetail/jobdetail.module').then( m => m.JobdetailPageModule)
  },
  {
    path: 'jobhistory',
    loadChildren: () => import('./pages/jobhistory/jobhistory.module').then( m => m.JobhistoryPageModule)
  },
  {
    path: 'jhistorydetail',
    loadChildren: () => import('./pages/jhistorydetail/jhistorydetail.module').then( m => m.JhistorydetailPageModule)
  },
  {
    path: 'jhistorydetail/:id',
    loadChildren: () => import('./pages/jhistorydetail/jhistorydetail.module').then( m => m.JhistorydetailPageModule)
  },
  {
    path: 'profits',
    loadChildren: () => import('./pages/profits/profits.module').then( m => m.ProfitsPageModule)
  },
  {
    path: 'activeorders',
    loadChildren: () => import('./pages/activeorders/activeorders.module').then( m => m.ActiveordersPageModule)
  },
  {
    path: 'cartdetail',
    loadChildren: () => import('./pages/cartdetail/cartdetail.module').then( m => m.CartdetailPageModule)
  },
  {
    path: 'cartdetail/:id',
    loadChildren: () => import('./pages/cartdetail/cartdetail.module').then( m => m.CartdetailPageModule)
  },
  {
    path: 'superdetails',
    loadChildren: () => import('./pages/superdetails/superdetails.module').then( m => m.SuperdetailsPageModule)
  },
  {
    path: 'thanks/:id/:pid/:name',
    loadChildren: () => import('./pages/thanks/thanks.module').then( m => m.ThanksPageModule)
  },
  {
    path: 'thanks/:id/:pid/:name/:origin/:destination',
    loadChildren: () => import('./pages/thanks/thanks.module').then( m => m.ThanksPageModule)
  },
  {
    path: 'mandaditos',
    loadChildren: () => import('./pages/mandaditos/mandaditos.module').then( m => m.MandaditosPageModule)
  },
  {
    path: 'testpush',
    loadChildren: () => import('./pages/testpush/testpush.module').then( m => m.TestpushPageModule)
  },
  {
    path: 'usercard',
    loadChildren: () => import('./pages/usercard/usercard.module').then( m => m.UsercardPageModule)
  },
  {
    path: 'cardfn/:desc/:price',
    loadChildren: () => import('./pages/cardfn/cardfn.module').then( m => m.CardfnPageModule)
  },
  {
    path: 'cardpay/:token/:desc/:price',
    loadChildren: () => import('./pages/cardpay/cardpay.module').then( m => m.CardpayPageModule)
  }









 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
