import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from '../menu/menu.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MapaComponent } from './mapa.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        MapaComponent
    ],
    exports: [
        MapaComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        IonicModule,
    ],
    providers: [
        Geolocation
    ]
})

export class ComponentModule { }    