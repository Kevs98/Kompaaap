import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Environment, GoogleMap, GoogleMaps, GoogleMapOptions, GoogleMapsEvent, GoogleMapsAnimation, Marker, Geocoder, ILatLng } from '@ionic-native/google-maps';
import { MyLocation } from '@ionic-native/google-maps';

declare var google : any;

@Component({
  selector: 'app-testmapa',
  templateUrl: './testmapa.page.html',
  styleUrls: ['./testmapa.page.scss'],
})
export class TestmapaPage  {

  @ViewChild('map', {read : ElementRef, static : false }) mapElement : ElementRef;
  private loading : any;
  private map : GoogleMap;
  public search : string = '';
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  public searchResults = new Array<any>();
  private originMarker : Marker;
  public destination : any;
  private googleDirectionsService = new google.maps.DirectionsService();


  constructor( private platform : Platform, private loadindCtrl : LoadingController, private ngZone : NgZone) { 

  }


  ionViewDidEnter(){
    this.mapElement = this.mapElement.nativeElement;

    this.loadMap();
  }

  async loadMap(){
    this.loading = await this.loadindCtrl.create({ message: 'Espere por favor'});
    await this.loading.present();

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCPtK1KCnD_dRdoqU3LxOupROGVdAddzJE',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCPtK1KCnD_dRdoqU3LxOupROGVdAddzJE'
    });

    const mapOptions : GoogleMapOptions = {
      controls: {
        zoom: false
      }
    };
    this.map = GoogleMaps.create(this.mapElement, mapOptions);
    
    try {
      await this.map.one(GoogleMapsEvent.MAP_READY);
      this.addOriginMarker();
    } catch(error) {
      console.error(error);
      
    }
  }

  async addOriginMarker(){
    try {
      const myLocation : MyLocation = await this.map.getMyLocation();

      await this.map.moveCamera({
        target: myLocation.latLng,
        zoom: 18
      });

      this.originMarker = this.map.addMarkerSync({
        title: 'Mi Ubicación',
        icon: '#002d79',
        animation: GoogleMapsAnimation.DROP,
        position: myLocation.latLng
      });

    } catch(error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  searchChanged(){
    if (!this.search.trim().length) return;

    this.googleAutocomplete.getPlacePredictions({ input: this.search }, predictions => {
      this.ngZone.run(() => {
        this.searchResults = predictions;
      });
    });
  }

  async calcRoute( item : any ){
    this.search = '';
    this.destination = item;

    const info : any = await Geocoder.geocode({ address : this.destination.description });
    
    let markerDestination : Marker = this.map.addMarkerSync({
      title: this.destination.description,
      icon: '#002d79',
      animation: GoogleMapsAnimation.DROP,
      position: info[0].position
    });

    this.googleDirectionsService.route({
      origin: this.originMarker.getPosition(),
      destination: markerDestination.getPosition(),
      travelMode: google.maps.TravelMode.DRIVING
    }, async results => {
      console.log(results);
      const points = new Array<ILatLng>();
      const routes = results.routes[0].overview_path;

      for (let i = 0; i < routes.length; i++) {
        points[i] = {
          lat: routes[i].lat(),
          lng: routes[i].lng()
        }
      }

      await this.map.addPolyline({
        points: points,
        color: '#ec7000',
        width: 3
      });

      await this.map.moveCamera({ target: points });
      this.map.panBy(0,100);

    });
  }

  async back(){
    try {
      await this.map.clear();
      this.destination = null;
      this.addOriginMarker();
    } catch(error) {
      console.error(error);
      
    }
  }

}
