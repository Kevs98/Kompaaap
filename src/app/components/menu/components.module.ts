import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from '../menu/menu.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'categories',
        loadChildren: () => import('../../pages/categories/categories.module').then( m => m.CategoriesPageModule)
    },
    {
        path: 'home', 
        loadChildren: () => import('../../home/home.module').then( m => m.HomePageModule)
    },
    {
        path: 'automovil',
        loadChildren: () => import('../../pages/automovil/automovil.module').then( m => m.AutomovilPageModule)
    },
]

@NgModule({
    declarations: [
        MenuComponent
    ],
    exports: [
        MenuComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes)
    ]
})

export class ComponentsModule { }