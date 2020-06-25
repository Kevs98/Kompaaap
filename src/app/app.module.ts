import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ComponentsModule } from  '../app/components/menu/components.module';
import { ComponentModule } from  '../app/components/mapa/components.module';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

import { GoogleMaps } from '@ionic-native/google-maps';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    FormsModule,
    ComponentsModule,
    ComponentModule,
    AngularFireAuthModule
  ],
  providers: [
    NativeGeocoder,
    Geolocation,
    Facebook,
    GooglePlus,
    StatusBar,
    SplashScreen,
    CallNumber,
    GoogleMaps,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
