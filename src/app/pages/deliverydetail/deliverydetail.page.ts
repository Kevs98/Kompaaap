import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Environment, GoogleMap, GoogleMaps, GoogleMapOptions, GoogleMapsEvent, GoogleMapsAnimation, Marker, Geocoder, ILatLng } from '@ionic-native/google-maps';
import { MyLocation } from '@ionic-native/google-maps';
import { servicesI } from '../../models/serivices.interface';
import { DeliveryjobsService } from '../../services/deliveryjobs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

declare var google : any;

@Component({
  selector: 'app-deliverydetail',
  templateUrl: './deliverydetail.page.html',
  styleUrls: ['./deliverydetail.page.scss'],
})
export class DeliverydetailPage {

  @ViewChild('map', {read : ElementRef, static : false }) mapElement : ElementRef;
  private loading : any;
  private map : GoogleMap;
  public search : string = '';
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  public searchResults = new Array<any>();
  private originMarker : Marker;
  private destinoMarker : Marker;
  public destination : any;
  private googleDirectionsService = new google.maps.DirectionsService();
  destino = {lat: 15.5060634, lng: -88.0404834};
  private test : any;
  public origen : any = '';
  public precio : number;

  jobs : servicesI[];
  id = null;

  directionService = new google.maps.DirectionsService();
  directionDisplay = new google.maps.DirectionsRenderer();

  constructor( private platform : Platform, private loadindCtrl : LoadingController, private ngZone : NgZone, private service : DeliveryjobsService, private route : ActivatedRoute, private geolocation : Geolocation ) { 

  }

  ionViewDidEnter(){
    this.id = this.route.snapshot.params['id'];
    this.mapElement = this.mapElement.nativeElement;

    this.loadMap();
    this.service.getDeliveryJobs().subscribe( res => {
      this.jobs = res;
    });

    if ( this.id == '645ReJeOxbCh04AbWp0f') {
      console.log('correcto');
      this.getposition();
    }

    console.log('vamos a ver', this.origen);
  }

  async getposition(){
    this.geolocation.getCurrentPosition().then( position => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      console.log('geo test',lat, lng);
      console.log('destino pos', this.destino);

      let org = { lat: lat, lng: lng };
      console.log('origen variable', org);

      const testpos = new google.maps.LatLng(org);
      const testdest = new google.maps.LatLng(this.destino);
      console.log('latlng',testpos);

      const predistancia = google.maps.geometry.spherical.computeDistanceBetween(testpos,testdest);
      const distancia = predistancia/1000;
      console.log('KM',distancia);

      if (distancia <= 1.5){
        this.precio = Math.trunc(distancia * 50)
      } else if (distancia <= 4){
        this.precio = Math.trunc(distancia * 60)
      } else if (distancia <= 6.5){
        this.precio = Math.trunc(distancia * 70)
      } else if (distancia <= 9){
        this.precio = Math.trunc(distancia * 80)
      } else if (distancia > 9 || distancia <= 10){
        this.precio = Math.trunc(distancia * 90)
      } else if (distancia > 10 || distancia >=12){
        this.precio = Math.trunc(distancia * 150)
      } else if (distancia > 12){
        this.precio = Math.trunc(distancia * 100)
      } 

      console.log('price',this.precio);
      

       
      
      this.directionService.route({
        origin: org,
        destination: this.destino,
        travelMode: google.maps.TravelMode.DRIVING,
      }, async (res, status) => {
        if (status === 'OK') {
          this.directionDisplay.setDirections(res);
          console.log('data', res);
          
        } else {
          alert('Imposible, algo anda mal'+ status);
        }

        const points = new Array<ILatLng>();
        const routes = res.routes[0].overview_path;

        for (let i = 0; i < routes.length; i++) {
          points[i]= {
            lat: routes[i].lat(),
            lng: routes[i].lng()
          }
        }

        await this.map.addPolyline({
          points: points,
          color: '#ec7000',
          width: 5
        });

        await this.map.moveCamera({ target: points});
      });
    })
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

      if (this.id == '645ReJeOxbCh04AbWp0f' ){
        this.addDestMarker();
      }
      console.log('despues de funcion',this.origen);
      
    } catch(error) {
      console.error(error);
      
    }

    
    
  }

  async addOriginMarker(){
    try {
      const myLocation : MyLocation = await this.map.getMyLocation();
      const pori = myLocation.latLng;
      console.log('origen', this.origen);

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

  async addDestMarker(){
    try {
      await this.map.moveCamera({
        target: this.destino,
        zoom: 18
      });

      this.destinoMarker = this.map.addMarkerSync({
        title: 'Mi Destino',
        icon: '#002d79',
        animation: GoogleMapsAnimation.DROP,
        position: this.destino
      });

    } catch(error) {
      console.error(error);
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

    console.log('destino', this.destination.description);
    

    const info : any = await Geocoder.geocode({ address : this.destination.description });
    console.log('info', info);
    
    
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
      console.log('Prueba', markerDestination.getPosition());
      
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

      console.log('coordenadas', markerDestination.getPosition());
      
      this.test = this.originMarker.getPosition();
      console.log('test', this.test);

      const org = new google.maps.LatLng(this.test);
      const dst = new google.maps.LatLng(markerDestination.getPosition());

      const predistancia = google.maps.geometry.spherical.computeDistanceBetween(org,dst);
      const distancia = predistancia/1000;
      console.log('KM',distancia);

      if (distancia <= 1.5){
        this.precio = Math.trunc(distancia * 50)
      } else if (distancia <= 4){
        this.precio = Math.trunc(distancia * 60)
      } else if (distancia <= 6.5){
        this.precio = Math.trunc(distancia * 70)
      } else if (distancia <= 9){
        this.precio = Math.trunc(distancia * 80)
      } else if (distancia > 9 || distancia <= 10){
        this.precio = Math.trunc(distancia * 90)
      } else if (distancia > 10 || distancia >=12){
        this.precio = Math.trunc(distancia * 150)
      } else if (distancia > 12){
        this.precio = Math.trunc(distancia * 100)
      } 

      console.log('price',this.precio);
      

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
