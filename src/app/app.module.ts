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
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
// import * as PixelPay from '@pixelpay/sdk';

import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [
    NativeGeocoder,
    Geolocation,
    LaunchNavigator,
    Facebook,
    GooglePlus,
    StatusBar,
    SplashScreen,
    CallNumber,
    GoogleMaps,
    FCM,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
