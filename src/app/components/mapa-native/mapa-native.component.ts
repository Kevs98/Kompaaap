import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { error } from 'protractor';

declare var google;

@Component({
  selector: 'app-mapa-native',
  templateUrl: './mapa-native.component.html',
  styleUrls: ['./mapa-native.component.scss'],
})
export class MapaNativeComponent implements OnInit {

  @ViewChild('map',  {static: false}) mapElement: ElementRef;
  map: any;
  address:string;
  lat: string;
  long: string;  
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;

  constructor( private geolocation : Geolocation, private nativeGeocoder : NativeGeocoder, private zone : NgZone) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {input: ''};
    this.autocompleteItems = [];
   }

   //cargar mapa
  ngOnInit() {
    this.loadMap();  
  }

  //cargar mapa 
  loadMap(){
      //localizacion del dispositivo
      this.geolocation.getCurrentPosition().then(( resp ) => {
        let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        //cargar con los valores previos
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy', this.map, this.map.center.lng())
        this.lat = this.map.center.lat();
        this.long = this.map.center.lng();
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords( lattitude, longitude){
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options : NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lattitude,longitude,options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
          responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch(( error: any) => {
        this.address = 'Address not Available';
      });
  }

  //Mostrar coordenadas en el centro del Mapa
  ShowCords(){
    alert('lat' +this.lat+', long'+this.long)
  }

  //Autocompletar usando predicciones de Google
  UpdateSearchResults(item){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions( { input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  //Llamar para cada Item
  SelectSearchResult(item){
    alert(JSON.stringify(item))
    this.placeid = item.place_id
  }

  //Limpiar barra despues de buscar
  ClearAutocomplete(){
    this.autocompleteItems = []
    this.autocomplete.input = ''
  }

  //ejemplo
  GoTo(){
    return window.location.href = 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id='+this.placeid;
  }
}
