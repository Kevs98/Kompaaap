import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AcautoService } from '../../services/acauto.service';
import { PeopleI } from '../../models/people.interface';
import { ActivatedRoute } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Platform, LoadingController } from '@ionic/angular';
import { Environment, GoogleMap, GoogleMaps, GoogleMapOptions, GoogleMapsEvent, GoogleMapsAnimation, Marker, Geocoder, ILatLng } from '@ionic-native/google-maps/ngx';
import { MyLocation } from '@ionic-native/google-maps/ngx';
import { ACHogarService } from 'src/app/services/achogar.service';
import { UploadService } from 'src/app/services/upload.service';
import { AlbañileriaService } from 'src/app/services/albañileria.service';
import { BarberiaService } from 'src/app/services/barberia.service';
import { BellezaService } from 'src/app/services/belleza.service';
import { CerrajeriaHService } from 'src/app/services/cerrajeria-h.service';
import { FontaneriaService } from 'src/app/services/fontaneria.service';
import { JardineriaService } from 'src/app/services/jardineria.service';
import { SpaService } from 'src/app/services/spa.service';
import { ComprasService } from 'src/app/services/compras.service';
import { PintorService } from 'src/app/services/pintor.service';
import { AparatosService } from 'src/app/services/aparatos.service';
import { FloristeriaService } from 'src/app/services/floristeria.service';
import { ReparacionesHogarService } from 'src/app/services/reparaciones-hogar.service';
import { ElectricidadHService } from 'src/app/services/electricidad-h.service';
import { AsistHogarService } from 'src/app/services/asist-hogar.service';
import { CerrajeriaVService } from 'src/app/services/cerrajeria-v.service';
import { PinturaService } from 'src/app/services/pintura.service';
import { LlanteraService } from 'src/app/services/llantera.service';
import { MecanicaService } from 'src/app/services/mecanica.service';
import { ElectricidadVService } from 'src/app/services/electricidad-v.service';


declare var google : any;

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.page.html',
  styleUrls: ['./people-detail.page.scss'],
})
export class PeopleDetailPage {

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
  destino = {lat: 15.5136232, lng: -88.0339314};
  private test : any;
  public origen : any = '';
  public precio : number;

  peoples: PeopleI = {};
  kompaId = null;

  directionService = new google.maps.DirectionsService();
  directionDisplay = new google.maps.DirectionsRenderer();

  constructor(
    private service: AcautoService,
    private route: ActivatedRoute,
    private callNumber : CallNumber,
    private geolocation : Geolocation,
    private platform : Platform, 
    private loadindCtrl : LoadingController, 
    private ngZone : NgZone,
    private ach : ACHogarService,
    private formService: UploadService,
    private carpinteria : AlbañileriaService,
    private barberia : BarberiaService,
    private belleza : BellezaService,
    private cerrajeriaH : CerrajeriaHService,
    private fontaneria : FontaneriaService,
    private jardinera : JardineriaService,
    private spa : SpaService,
    private ACH : ACHogarService,
    private compras : ComprasService,
    private pintor : PintorService,
    private aparatos : AparatosService,
    private flores : FloristeriaService,
    private reparaciones : ReparacionesHogarService,
    private electricoH : ElectricidadHService,
    private asistenciaH : AsistHogarService,
    private cerrajeriaA : CerrajeriaVService,
    private pintura : PinturaService,
    private llantera : LlanteraService,
    private mecanica : MecanicaService,
    private electricoA : ElectricidadVService
  ) {
  
   }

   ionViewDidEnter(){
    this.kompaId = this.route.snapshot.params['id'];
    this.mapElement = this.mapElement.nativeElement;

    this.loadMap();
    this.kompaId = this.route.snapshot.params['id'];
    console.log('Este es el Id', this.kompaId);
    if(this.kompaId){
      this.loadPeople();
      this.getposition();
      console.log('Exito');
    }
  }

  prueba(celPhone: string){
    this.callNumber.callNumber(this.peoples.phone , true)
      .then(res => console.log('Launched Dialer', res))
      .catch( err => console.log('Error Launching Dialer', err));
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
  
  loadPeople(){
    if(this.kompaId == 'dMwrhUi3H3gdVzrqdWSC'){
      this.service.getOne(this.kompaId).subscribe(res => {
        this.peoples = res;
        console.log('aqui funciona', this.peoples)
      });
    }
    if (this.kompaId == 'jI089r95z3pBEn0W9cJj'){
      this.ach.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    } 
    if ( this.kompaId == 'mIoLqVxmLdwTnodIoJ96') {
      this.belleza.getOne(this.kompaId).subscribe( res => {
        this.peoples =  res;
      });
    }
    if ( this.kompaId == 'QZhUNOSbAqSXmYzksdAD') {
      this.carpinteria.getOne(this.kompaId).subscribe ( res => {
        this.peoples = res;
      });
    }
    if (this.kompaId == 'MjzQNBIeX5qndOAXLqK2'){
      this.compras.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    }
    if (this.kompaId == '4sEX97t74WNsxJmfU5Cc') {
      this.asistenciaH.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    }
    if ( this.kompaId == 'P7iTVQIOEuwKriAcUVbP') {
      this.barberia.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    }
    if (this.kompaId == '3SymwKb50bZZYGRIOilN') {
      this.aparatos.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    }
    if(this.kompaId == 'HcWtzcBppxGeskX6ptzu'){
      this.pintor.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    }
    if(this.kompaId == '6ujkD3GOsjo3VF39m5pv') {
      this.cerrajeriaH.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    }
    if (this.kompaId == 'yIQAgwzvlvWqKsq2cLws'){
      this.spa.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    }
    if (this.kompaId == 'lvZI6V7XtdSIweVZdXyB'){
      this.flores.getOne(this.kompaId).subscribe(res => {
        this.peoples = res;
      });
    }
    if(this.kompaId == '9WwigrIdXoZKQls3lWlu') {
      this.jardinera.getOne(this.kompaId).subscribe(res => {
        this.peoples = res;
      });
    }
    if (this.kompaId == 'T8nbO8Xd0faCkTeEEQOr') {
      this.fontaneria.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    }
    if (this.kompaId == 'erwhO5swMArSgKcHSTGE') {
      this.reparaciones.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    }
    if (this.kompaId == 'p0cHIv05QIsAqSurKmSA') {
      this.electricoH.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    }
    if (this.kompaId == 'huApd9g9TFEo4f7QEaqY') {
      this.electricoA.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    }
    if (this.kompaId == 'Q5HeEaqBXVVFLXlwYW24') {
      this.mecanica.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    }
    if (this.kompaId == 'A9GqzDn7liazsDTbNBlC'){
      this.cerrajeriaA.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    }
    if (this.kompaId == 'biLdC3NBrRU41eYtp0VT'){
      this.pintura.getOne(this.kompaId).subscribe(res => {
        this.peoples = res;
      });
    }
    if (this.kompaId == 'VwmcjSDohUcPJvAdHyrH'){
      this.llantera.getOne(this.kompaId).subscribe( res => {
        this.peoples = res;
      });
    }
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
      this.addDestMarker();
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

  pagar(){
    alert('Muy pronto');
  }
}
