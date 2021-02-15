import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public localNotification : LocalNotifications
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      FCM.getToken().then(token => {
        console.log('TOKEN', token);
      }).catch(error => {
        console.log(error);
      });
  
      FCM.onTokenRefresh().subscribe((token: string) => {
        console.log('TOKEN_UPDATE', token);
      });
  
      FCM.onNotification().subscribe(data => {
        if( data.wasTapped){
          //Cuando estamos en segundo plano
          console.log('Estamos en segundo Plano'+ JSON.stringify(data));
        } else {
          //Ocurre cuando la app esta en primer plano o abierta
          console.log('Estamos en ejecución' + JSON.stringify(data));

          this.localNotification.schedule({
            id: Math.floor((Math.random()*100) +1),
            title: "Notificacion Generada Localmente (app)",
            text: "Texto generado Localmente",
            data: {
              nombre: "Kevin",
              apellido: "Estrada"
            }
          });
        }
      }, error => {
        console.log('Alto error', error);
      })
    });

    this.localNotification.on("click").subscribe( res => {
      console.log(JSON.stringify(res));
    });
    
  }
}
