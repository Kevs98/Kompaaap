import { DriverMarketService } from './../../services/driver-market.service';
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
import { CdrioService } from 'src/app/services/cdrio.service';
import { pid } from 'process';

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
  cerveceria                      = {lat: 15.4951258, lng: -88.0363354};
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
  name    = null;
  suma    = null;
  locateOrder = "";
  restOrder   = "";
  clientub    = "";
  clienterub  = "";
  cancelar    = 0;
  origin      = null;
  destinar    = null;
  pid         = null;
  org         = null;
  Corigen     = null;
  Cdestino    = null;
  see         = null;

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
    private nichas      : NichasmenuService,
    private cdrio       : CdrioService,
    private superDriver : DriverMarketService
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
    this.name    = this.route.snapshot.params['name'];
    this.suma    = this.route.snapshot.params['suma'];
    this.origin  = this.route.snapshot.params['origin'];
    this.destinar= this.route.snapshot.params['destination'];
    this.pid     = this.route.snapshot.params['pid'];

    console.log('id', this.id);         //conductor
    console.log('rid', this.rid);       //tipo(mandado)
    console.log('ori', this.orderid);   //destino
    console.log('dset', this.suma);     //origen
    console.log('cant', this.name);     //precio
    console.log('from', this.from);     //nombre


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
      console.log()
      if (this.id == 'super'){
        this.loadMarketDriver();
      }else{
        this.loadPeople();
        this.loadTaxi();
      }
    // }else if(this.rid == 'VIP'){
    // }
    this.loadMap();
    this.service.getDeliveryJobs().subscribe( res => {
      this.jobs = res;
    });

    if ( this.rid == '645ReJeOxbCh04AbWp0f' || this.rid == 'CSbCSCOhoxMNnneTOpvv' || this.id == 'super' || this.rid == 'mandado') {
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

  loadMarketDriver(){
    this.superDriver.getOne(this.pid).subscribe(res => {
      this.Peoples = res;
      console.log('gente de super', this.Peoples.userId);
      this.see = this.Peoples.userId;
    })
  }

  loadTaxi(){
    this.tService.getOne(this.id).subscribe( res => {
      this.Peoples = res;
      console.log(res);
      
    });
  }

  llamar(){
    this.callNumber.callNumber('89220953' , true)
      .then(res => console.log('Launched Dialer', res))
      .catch( err => console.log('Error Launching Dialer', err));
      console.log('Tel: ',this.Peoples.phone);
      
  }

  loadPlato(){
    if (this.rid == '645ReJeOxbCh04AbWp0f'){
      this.nichas.getOne(this.orderid).subscribe( res => {
        this.menu = res;
        console.log('menu',res);
      });
    } else if (this.rid == 'CSbCSCOhoxMNnneTOpvv'){
      this.cdrio.getOne(this.orderid).subscribe( res => {
        this.menu = res;
        console.log('menu', res);
      });
    }
  }

  async getposition(){
    if(this.rid == '645ReJeOxbCh04AbWp0f'){
      this.destino = this.destino;
    } else if (this.rid == 'CSbCSCOhoxMNnneTOpvv'){
      this.destino = this.cerveceria;
    }else if(this.id  == 'super'){
      this.destino = this.destinar;
    } else if (this.rid == 'mandado'){
      this.destino = this.from;
      console.log('destinocard', this.destino);
      
    }
    this.geolocation.getCurrentPosition().then( position => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      console.log('geo test',lat, lng);
      console.log('destino pos', this.destino);
      console.log('origindir', this.origin);

      if (this.id == 'super'){
        const lato = parseFloat(this.origin.substring(0, 10));
        const lngo = parseFloat(this.origin.substring(12, 29));

        this.Corigen = {lat: lato, lng: lngo}; 
        console.log('substring',this.Corigen);
        this.org = this.origin;

        const latd = parseFloat(this.destinar.substring(0, 10));
        const lngd = parseFloat(this.destinar.substring(12, 29));

        this.Cdestino = {lat: latd, lng: lngd};
      } else if( this.rid == 'mandado'){
        const lato = parseFloat(this.from.substring(0,10));
        const lngo = parseFloat(this.from.substring(12,29));

        this.Corigen = {lat: lato, lng: lngo};
        console.log('substring',this.Corigen);
        this.org = this.suma;

        const latd = parseFloat(this.name.substring(0,10));
        const lngd = parseFloat(this.name.substring(12,29));
        this.destino = this.orderid;

        this.Cdestino = {lat: latd, lng: lngd};
      } else {
         this.org = { lat: lat, lng: lng };
      }
      console.log('origen variable', this.org);
      

      const test = new google.maps.LatLng(this.org);
      console.log('a ver que sale', test);

      console.log('CORIGEN', this.Corigen);
      console.log('CDESTINO', this.Cdestino);

      const testpos = new google.maps.LatLng(this.Corigen);
      const testdest = new google.maps.LatLng(this.Cdestino);
      console.log('latlng',testpos);
      console.log('destest', testdest);

      const predistancia = google.maps.geometry.spherical.computeDistanceBetween(testpos,testdest);
      const distancia = Math.round(predistancia/1000);
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
      
      if (this.rid == '645ReJeOxbCh04AbWp0f' || this.rid == 'CSbCSCOhoxMNnneTOpvv' || this.id == 'super' || this.rid == 'mandado'){
        const itemH  = document.getElementById('testI');
        const itemL  = document.getElementById('test');
        const search = document.getElementById('search');
        search.style.display = 'none'; 
        itemH.style.display = 'none';
      }

       
      
      this.directionService.route({
        origin: this.from,
        destination: this.name,        
        travelMode: google.maps.TravelMode.DRIVING,
      }, async (res, status) => {
        if (status === 'OK') {
          this.directionDisplay.setDirections(res);
          console.log('data', res);
          
        } else {
          alert('Imposible, algo anda mal '+ status);
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
      this.geolocation.getCurrentPosition().then( position => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        console.log('dos de una',lat,lng);

        this.clienterub = lat.toString() + ',' + lng.toString();
        console.log('done', this.clienterub);

        if (this.rid == '645ReJeOxbCh04AbWp0f' || this.rid == 'CSbCSCOhoxMNnneTOpvv' || this.id == 'super' || this.id == 'mandado'){
          this.addDestMarker();
          this.restOrder = this.olat.toString() + ',' + this.olng.toString();
          console.log('exito',this.from);
          console.log('exio',this.cantidad);
          console.log('precioooo', this.id);
          if (this.from == 'carrito'){
            const order = {
              nombre    : 'Varias Ordenes',
              nombreV   : this.name,
              precio    : this.suma,
              cancelado : this.cancelar,
              driverId  : this.Peoples.userId,
              cliente   : this.usuario.displayName,
              clienteID : this.usuario.uid,
              DName     : this.Peoples.nombre + '' + this.Peoples.apellido,
              ubicacion : this.restOrder,
              clienteub : this.clienterub,
              phone     : "97544506",
              estado    : 0
            }
            console.log('restOrder',order);
            this.orderCollection.add(order);
            this.alerta();
          } else if( this.id == 'super'){
            console.log('AQUI ENTRÓ AL IF');
            console.log('error', this.Peoples.userId);
            const order = {
              nombre    : 'Supermercado',
              precio    : this.precio,
              cancelado : this.cancelar,
              driverId  : this.Peoples.userId,
              DName     : this.Peoples.nombre + ' ' + this.Peoples.apellido,
              cliente   : this.usuario.displayName,
              clienteID : this.usuario.uid,
              clienteub : this.destinar,
              ubicacion : this.origin,
              phone     : "97544506",
              estado    : 0
            }
            console.log('AQUI PASÓ LA CONSTANTE');
            console.log('restOrder',order);
            console.log('Paso la constante');
            this.orderCollection.add(order);

            this.alerta();
          }else if (this.id == 'mandado'){
            const order = {
              nombre    : 'Kompa Mandadito',
              precio    : this.suma,
              cancelado : this.cancelar,
              cantidad  : this.from,
              driverId  : this.Peoples.userId,
              DName     : this.Peoples.nombre + '' + this.Peoples.apellido,
              cliente   : this.usuario.displayName,
              clienteID : this.usuario.uid,
              clienteub : this.clienterub,
              ubicacion : this.restOrder,
              phone     : "97544506",
              estado    : 0
            }
            console.log('restOrder',order);
            this.orderCollection.add(order);

            this.alerta();
          }else {
            console.log('La orden ya esta añadida');
          }
        }
      });
      
      console.log('despues de funcion',this.origen);

    } catch(error) {
      console.error(error);
      
    }
  }

  alerta(){
    alert('su orden fue asignada el conductor se pondra en contacto con usted, gracias por usar Kompa App');
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
    if(this.rid == '645ReJeOxbCh04AbWp0f'){
      this.destino = this.destino;
    } else if (this.rid == 'CSbCSCOhoxMNnneTOpvv'){
      this.destino = this.cerveceria;
    }
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

    const options = {
      componentRestrictions: { country: "us" }
    };

    this.googleAutocomplete.getPlacePredictions({ input: this.search, componentRestrictions: { country: "hn" } }, predictions => {
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

      console.log('testlat',this.test.lat);
      console.log('testlng',this.test.lng);

      const org = new google.maps.LatLng(this.test);
      const dst = new google.maps.LatLng(markerDestination.getPosition());

      const predistancia = google.maps.geometry.spherical.computeDistanceBetween(org,dst);
      const distancia = Math.round(predistancia/1000);
      console.log('KM',distancia);

      if( this.rid == 'Yi6YGwJGFykzzbCcmErN'){
        if (distancia <= 1.5){
          this.precio =  60;
        } else if ( distancia > 1.5 && distancia <= 4.5 ){
          this.precio = 75;
        } else if (distancia > 4.5 && distancia <= 9){
          this.precio = 90;
        } else if (distancia > 9){
          this.precio = 150;
        } 
      } else if (this.rid == 'VIP'){
        if (distancia <= 4){
          this.precio = 83;
        } else if ( distancia > 4){
          this.precio = ((distancia - 4 )* 4.50)+83;
        }
      }

      console.log('price',this.precio);

      const latO = info[0].position.lat;
      const lngO = info[0].position.lng;

      this.locateOrder = latO.toString() + ',' + lngO.toString();
      this.clientub    = this.test.lat.toString() + ',' + this.test.lng.toString();
      console.log('ubimed',this.locateOrder);

      const order = {
        nombre    : "Delivery / VIP",
        precio    : this.precio,
        cancelado : this.cancelar,
        driverId  : this.Peoples.userId,
        DName     : this.Peoples.nombre + '' + this.Peoples.apellido,
        cliente   : this.usuario.displayName,
        clienteID : this.usuario.uid,
        ubicacion : this.locateOrder,
        clienteub : this.clientub,
        phone     : "96487764",
        estado    : 0
      }

      console.log('objOrder', order);
      this.orderCollection.add(order);

      this.alerta();

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
