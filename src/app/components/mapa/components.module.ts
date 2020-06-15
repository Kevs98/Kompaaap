import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from '../menu/menu.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MapaComponent } from './mapa.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
    declarations: [
        MapaComponent
    ],
    exports: [
        MapaComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
    ],
    providers: [
        Geolocation
    ]
})

export class ComponentModule { }    