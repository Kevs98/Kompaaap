import { Geocoder } from '@ionic-native/google-maps/ngx';
import { Component, NgZone, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { LatLng } from '@ionic-native/google-maps';

declare var google : any;

@Component({
  selector: 'app-mandaditos',
  templateUrl: './mandaditos.page.html',
  styleUrls: ['./mandaditos.page.scss'],
})
export class MandaditosPage implements OnInit {

  public search               : string = '';
  public dest                 : string = '';
  public searchDest           : string = '';
  public searchResults        = new Array<any>();
  public searchResultsDest    = new Array<any>();
  private googleAutocomplete  = new google.maps.places.AutocompleteService();
  public destination          : any;
  public destinationD         : any;
  Label1                      = '';
  Label2                      = '';
  origen                      = '';
  origenlat                   = '';
  origenlng                   = '';
  destinolat                  = '';
  destinolng                  = '';
  destino                     = '';
  user                        = firebase.auth().currentUser;
  nombre                      = null;
  descripcion                 = '';
  precio                      = 0;

  constructor( private ngZone : NgZone) { }

  ngOnInit() {
    this.nombre = this.user.displayName;
    this.obtenerDesc();
  }

  searchChanged(){
    if (!this.search.trim().length) return;

    this.googleAutocomplete.getPlacePredictions({ input: this.search, componentRestrictions: { country: "hn" } }, predictions => {
      this.ngZone.run(() => {
        this.searchResults = predictions;
      });
    });
  }
  searchChangedDest(){
    if (!this.searchDest.trim().length) return;

    this.googleAutocomplete.getPlacePredictions({ input: this.searchDest, componentRestrictions: { country: "hn" } }, predictions => {
      this.ngZone.run(() => {
        this.searchResultsDest = predictions;
      });
    });
  }

  async calcRoute(Item : any){
    this.search       = '';
    this.destination  = Item;

    console.log('destino', this.destination.description);
    this.Label1 = this.destination.description;
    console.log('data', this.destination);

    const info : any = await Geocoder.geocode({ address: this.destination.description });
    console.log('información', info);
    this.origenlat = info[0].position.lat;
    this.origenlng = info[0].position.lng;
    this.origen    = this.origenlat + ',' + this.origenlng;
    console.log('coords', this.origen);
    
  }

  async calcRouteDest(Item : any){
    this.searchDest   = '';
    this.destinationD = Item;

    console.log('destinoD', this.destinationD.description);
    this.Label2 = this.destinationD.description;

    const info : any = await Geocoder.geocode({ address : this.destinationD.description });
    console.log('información', info);
    this.destinolat = info[0].position.lat;
    this.destinolng = info[0].position.lng;
    this.destino    = this.destinolat + ',' + this.destinolng;
    this.test();
  }

  test(){
    const olc = { lat : this.origenlat, lng: this.origenlng };
    const dlc = { lat : this.destinolat, lng: this.destinolng };

    const ol = new google.maps.LatLng(olc);
    const dl = new google.maps.LatLng(dlc);

    console.log('origen', ol);
    console.log('destino', dl);
    
    const predistancia = google.maps.geometry.spherical.computeDistanceBetween(ol,dl);
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

  }

  obtenerDesc(){
    var test =  document.getElementById("test");

    test.addEventListener('click', () => {
      this.descripcion = (<HTMLInputElement>document.getElementById("desc")).value;
      alert('Su orden es: ' +this.descripcion);
    });
  }

  }

