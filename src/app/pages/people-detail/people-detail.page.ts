import { Component, OnInit } from '@angular/core';
import { AcautoService } from '../../services/acauto.service';
import { PeopleI } from '../../models/people.interface';
import { ActivatedRoute } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}


@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.page.html',
  styleUrls: ['./people-detail.page.scss'],
})
export class PeopleDetailPage implements OnInit {

  lat: number
  lon: number
  total: number
  precio: number

  map : any;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer(); 

  origin = { lat: 15.5136232, lng: -88.0339314 };           //Direccion Oficina de Kompa
  destination = { lat: 15.5508957, lng: -88.0143145 }; 

  markers : Marker[] = [];

  peoples: PeopleI = {};
  kompaId = null;

  constructor(private service: AcautoService, private route: ActivatedRoute, private callNumber : CallNumber, private geolocation : Geolocation) {
    this.getGeolocation();
    console.log(this.getGeolocation());
   }

  ngOnInit() {
    this.loadMap();
    this.kompaId = this.route.snapshot.params['id'];
    console.log('Este es el Id', this.kompaId);
    if(this.kompaId){
      this.loadPeople();
      console.log('Exito');
    }
  }

  prueba(celPhone: string){
    this.callNumber.callNumber(this.peoples.phone , true)
      .then(res => console.log('Launched Dialer', res))
      .catch( err => console.log('Error Launching Dialer', err));
  }
  
  loadPeople(){
    this.service.getOne(this.kompaId).subscribe(res => {
      this.peoples = res;
      console.log('aqui funciona', this.peoples)
    });
  }

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;

      let latdes = 15.5136232;
      let londes = -88.0339314;

      this.total = this.calculateDistance(this.lon, londes, this.lat, latdes);
      this.precio = this.calculatePrice(this.total);
    }).catch((error) => {
      console.log('Error al obtener ubicacion');
    });
  }

    calculateDistance(lon1, lon2, lat1, lat2){
      let p = 0.017453292519943295;
      let c = Math.cos;
      let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((lon1- lon2) * p))) / 2;
      let dis = (12742 * Math.asin(Math.sqrt(a)));
      console.log(Math.trunc(dis));
      return Math.trunc(dis);
  }

  calculatePrice(valor){
    if(this.total <= 1.5){
      return valor = this.total*50;
    } else if (this.total <= 4){
      return valor = this.total*60;
    } else if (this.total <= 6.5){
      return valor = this.total*70;
    } else if (this.total <= 9){
      return valor = this.total*80;
    } else if (this.total <= 15){
      return valor = this.total*100;
    } else if (this.total > 15){
      return valor = this.total*150;
    }
  }
  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    // create LatLng object
    //const myLatLng = {lat: 15.5197243, lng: -88.05553};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.origin,        //Coloca el mapa en la direccion de Kompa
      zoom: 12
    });
    
    //Agregamos direccion al mapa
    this.directionsDisplay.setMap(this.map);
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
    //this.renderMarkers();       //luego aqui renderesimaos de otra forma
    mapEle.classList.add('show-map');

      //Aqui calculamos la ruta Opctima
      this.calculateRoute();
      //Recorre los marcadores y los agrega al mapa.
    //  this.renderMarkers();
    });
  }

  private calculateRoute() {
    this.directionsService.route({
      origin: { lat: this.lat, lng: this.lon},
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('No se pudo desplegar la direccion: ' + status);
      }
    });
    }

    //Recorre array de Markers para graficarlos
    renderMarkers() {
      this.markers.forEach(marker => {
        this.addMarker(marker);
      });
    }
    //Agregar Marcador
    addMarker(marker: Marker) {
      return new google.maps.Marker({
        position: marker.position,
        map: this.map,
        title: marker.title
      });
    }
}
