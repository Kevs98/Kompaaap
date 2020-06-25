import { Component, OnInit, ViewChild} from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Environment, GoogleMap, GoogleMaps } from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-mapa-native',
  templateUrl: './mapa-native.component.html',
  styleUrls: ['./mapa-native.component.scss'],
})
export class MapaNativeComponent implements OnInit {

  @ViewChild('map',{static: false}) mapElement: any;
  private loading : any;
  private map : GoogleMap;

  constructor(private platform : Platform, private loadingCtrl : LoadingController ) {
   }

   //cargar mapa
  ngOnInit() {
    this.mapElement = this.mapElement.nativeElement;

    this.mapElement.style.width = this.platform.width() + 'px';
    this.mapElement.style.height = this.platform.height() + 'px';

    this.loadMap();
  }

  async loadMap(){
    this.loading = await this.loadingCtrl.create({ message : 'Espere un momento..'});
    await this.loading.present();

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCPtK1KCnD_dRdoqU3LxOupROGVdAddzJE',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCPtK1KCnD_dRdoqU3LxOupROGVdAddzJE'
    });

    this.map = GoogleMaps.create(this.mapElement);
  }
}
