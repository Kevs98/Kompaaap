import { Component, OnInit } from '@angular/core';
import { servicesI } from '../../models/serivices.interface';
import { DeliveryjobsService } from '../../services/deliveryjobs.service';
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
  selector: 'app-deliverydetail',
  templateUrl: './deliverydetail.page.html',
  styleUrls: ['./deliverydetail.page.scss'],
})
export class DeliverydetailPage implements OnInit {

  lat: number
  lon: number
  total: number
  precio: number

  map : any;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer(); 

  origin = { lat: 15.5136232, lng: -88.0339314 };           //Direccion Oficina de Kompa
  destination = { lat: 15.5508957, lng: -88.0143145 }; 

  markers: Marker[] = [
    // {
    //   position: {
    //     lat: 15.5136232,
    //     lng: -88.0339314,
    //   },
    //   title: 'Kompa Office'
    // },
    // {
    //   position: {
    //     lat: 15.5508957,
    //     lng: -88.0143145,
    //   },
    //   title: 'UTH, Campus SPS'
    // },
    // {
    //   position: {
    //     lat: 15.4077245,
    //     lng: -88.0099109,
    //   },
    //   title: 'Salida al Sur,SPS'
    // },
    // {
    //   position: {
    //     lat: 15.6032016,
    //     lng: -87.9603946,
    //   },
    //   title: 'Salida al Norte, SPS'
    // },
    // {
    //   position: {
    //     lat: 15.4678838,
    //     lng: -87.9669046,
    //   },
    //   title: 'Salida al Este, SPS'
    // },
    // {
    //   position: {
    //     lat: 15.5054647,
    //     lng: -88.0276709,
    //   },
    //   title: 'Centro SPS'
    // }
  ];

  jobs : servicesI[];

  constructor(private geolocation : Geolocation, private service : DeliveryjobsService) { 
    this.getGeolocation();
    console.log(this.getGeolocation());
  }

  ngOnInit() {
    this.loadMap();
    this.service.getDeliveryJobs().subscribe( res => {
      this.jobs = res;
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

  //Funcion para calcular la ruta Optima
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
