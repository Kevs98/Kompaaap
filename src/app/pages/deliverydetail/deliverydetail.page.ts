import { map } from 'rxjs/operators';
import { DriversI } from './../../models/drivers.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { TaxiService } from './../../services/taxi.service';
import { DeliveryService } from 'src/app/services/delivery.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Environment, GoogleMap, GoogleMaps, GoogleMapOptions, GoogleMapsEvent, GoogleMapsAnimation, Marker, Geocoder, ILatLng } from '@ionic-native/google-maps/ngx';
import { MyLocation } from '@ionic-native/google-maps/ngx';
import { servicesI } from '../../models/serivices.interface';
import { DeliveryjobsService } from '../../services/deliveryjobs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { PeopleI } from 'src/app/models/people.interface';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { OrderI } from 'src/app/models/order.interface';
import { NichasmenuService } from 'src/app/services/nichasmenu.service';
import { MenuI } from 'src/app/models/menu.interface';

declare var google : any;

@Component({
  selector: 'app-deliverydetail',
  templateUrl: './deliverydetail.page.html',
  styleUrls: ['./deliverydetail.page.scss'],
})
export class DeliverydetailPage {

  @ViewChild('map', {read : ElementRef, static : false }) mapElement : ElementRef;
  private loading                 : any;
  private map                     : GoogleMap;
  public search                   : string = '';
  private googleAutocomplete      = new google.maps.places.AutocompleteService();
  public searchResults            = new Array<any>();
  private originMarker            : Marker;
  private destinoMarker           : Marker;
  public destination              : any;
  private googleDirectionsService = new google.maps.DirectionsService();
  destino                         = {lat: 15.5060634, lng: -88.03829470000001};
  olat                            = 15.5060634;
  olng                            = -88.03829470000001;
  private test                    : any;
  public origen                   : any = '';
  public precio                   : number;

  jobs    : servicesI[];
  Peoples : DriversI = {};
  id      = null;
  rid     = null;
  orderid = null;
  menu    : MenuI = {};
  oPrecio = null;
  cantidad= null;
  from    = null;
  tipo    = null;

  locateOrder = "";
  restOrder   = "";

  directionService = new google.maps.DirectionsService();
  directionDisplay = new google.maps.DirectionsRenderer();
  private orderCollection : AngularFirestoreCollection<OrderI>
  private orders          : Observable<any>
  usuario = firebase.auth().currentUser;

  constructor( 
    private platform    : Platform, 
    private loadindCtrl : LoadingController, 
    private ngZone      : NgZone, 
    private service     : DeliveryjobsService, 
    private route       : ActivatedRoute, 
    private geolocation : Geolocation ,
    private dservice    : DeliveryService,
    private tService    : TaxiService,
    private callNumber  : CallNumber,
    private bd          : AngularFirestore,
    private nichas     : NichasmenuService
  ) { 

  }

  ionViewDidEnter(){
    this.id      = this.route.snapshot.params['id'];
    this.rid     = this.route.snapshot.params['rid'];
    this.orderid = this.route.snapshot.params['oid'];
    this.oPrecio = this.route.snapshot.params['precio'];
    this.cantidad= this.route.snapshot.params['cant'];
    this.from    = this.route.snapshot.params['from'];
    this.tipo    = this.route.snapshot.params['tipo'];

    if(this.rid == 'VIP'){
      console.log('taxi');
    }else if( this.tipo == 'delivery'){
      console.log('delivery');
    }

    console.log('id', this.id);
    this.orderCollection = this.bd.collection<OrderI>('Order');
    this.orders = this.orderCollection.snapshotChanges().pipe( map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as OrderI;
        const id   = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));

    this.mapElement = this.mapElement.nativeElement;
    // if(tis.tipo == 'delivery'){
      this.loadPeople();
    // }else if(this.rid == 'VIP'){
      this.loadTaxi();
    // }
    this.loadMap();
    this.service.getDeliveryJobs().subscribe( res => {
      this.jobs = res;
    });

    if ( this.rid == '645ReJeOxbCh04AbWp0f') {
      console.log('correcto');
      this.loadPlato();
      this.getposition();
    }

    console.log('vamos a ver', this.origen);
  }

  loadPeople(){
    this.dservice.getOne(this.id).subscribe( res => {
      this.Peoples = res;
      console.log(res);
      
    });
  }

  loadTaxi(){
    this.tService.getOne(this.id).subscribe( res => {
      this.Peoples = res;
      console.log(res);
      
    });
  }

  llamar(){
    this.callNumber.callNumber(this.Peoples.phone , true)
      .then(res => console.log('Launched Dialer', res))
      .catch( err => console.log('Error Launching Dialer', err));
      console.log('Tel: ',this.Peoples.phone);
      
  }

  loadPlato(){
    this.nichas.getOne(this.orderid).subscribe( res => {
      this.menu = res;
      console.log('menu',res);
    });
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
        this.precio = 50;
      } else if (distancia <= 4){
        this.precio = 60;
      } else if (distancia <= 6.5){
        this.precio = 70;
      } else if (distancia <= 9){
        this.precio = 80;
      } else if (distancia > 9 && distancia <= 10){
        this.precio = 90;
      } else if (distancia > 10 && distancia <=12){
        this.precio = 100;
      } else if (distancia > 12){
        this.precio = 150;
      } 

      console.log('price',this.precio);
      
      if (this.rid == '645ReJeOxbCh04AbWp0f'){
        const itemH = document.getElementById('testI');
        itemH.style.display = 'none';
      }

       
      
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

      if (this.rid == '645ReJeOxbCh04AbWp0f'){
        this.addDestMarker();
        this.restOrder = this.olat.toString() + ',' + this.olng.toString();
        console.log('exito',this.from);
        console.log('exio',this.cantidad);

        if (this.cantidad == 'carrito'){
          const order = {
            nombre    : 'Varias Ordenes',
            precio    : this.oPrecio,
            driverId  : this.Peoples.userId,
            cliente   : this.usuario.displayName,
            ubicacion : this.restOrder,
            phone     : "97544506",
            estado    : 0
          }
          console.log('restOrder',order);
          this.orderCollection.add(order);
        } else {
          const order = {
            nombre    : this.menu.nombre,
            precio    : this.oPrecio,
            cantidad  : this.from,
            driverId  : this.Peoples.userId,
            cliente   : this.usuario.displayName,
            ubicacion : this.restOrder,
            phone     : "97544506",
            estado    : 0
          }
          console.log('restOrder',order);
          this.orderCollection.add(order);
        }

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
        this.precio =  50;
      } else if (distancia >= 4 && distancia <= 6.5){
        this.precio = 60;
      } else if (distancia >= 6.5 && distancia <= 9){
        this.precio = 70;
      } else if (distancia <= 9){
        this.precio = 80;
      } else if (distancia > 9 && distancia <= 10){
        this.precio = 90;
      } else if (distancia > 10 && distancia <=12){
        this.precio = 100;
      } else if (distancia > 12){
        this.precio = 150;
      } 

      console.log('price',this.precio);

      const latO = info[0].position.lat;
      const lngO = info[0].position.lng;

      this.locateOrder = latO.toString() + ',' + lngO.toString();
      console.log('ubimed',this.locateOrder);

      const order = {
        nombre    : "Delivery / VIP",
        precio    : this.precio,
        driverId  : this.Peoples.userId,
        cliente   : this.usuario.displayName,
        ubicacion : this.locateOrder,
        phone     : "96487764",
        estado    : 0
      }

      console.log('objOrder', order);
      this.orderCollection.add(order);

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

  Payment(){
    alert('Esta funcion aun no esta disponible');
  }

}
