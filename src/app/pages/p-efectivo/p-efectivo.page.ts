import { Observable, pipe } from 'rxjs';
import { OrderI } from 'src/app/models/order.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { MenuI } from 'src/app/models/menu.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NichasmenuService } from 'src/app/services/nichasmenu.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CdrioService } from 'src/app/services/cdrio.service';
import { OrderServiceService } from 'src/app/services/order-service.service';

declare var google : any;
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-p-efectivo',
  templateUrl: './p-efectivo.page.html',
  styleUrls: ['./p-efectivo.page.scss'],
})
export class PEfectivoPage implements OnInit {

  kompaId  = null;
  rid      = null;
  from     = null;
  name     = null;
  menu     : MenuI = {};
  total    = 0;
  cantidad = 0;
  test     : any;
  ISV      = 0;
  ISVM     = 0;
  header   = null;
  origen   = '';
  destino  = '';
  precio   = 0;
  envio    = 0;
  price    = null;
  type     = null;
  tipo     = '';
  nichasub = {lat: 15.5060634, lng: -88.03829470000001};
  cdrioub  = {lat: 15.4951258, lng: -88.0363354};
  user     = firebase.auth().currentUser;
  username = this.user.displayName;

  private orderColection : AngularFirestoreCollection<OrderI>;
  private ordergeneral   : Observable<any>;

  constructor(
    private route       : ActivatedRoute,
    private nichas      : NichasmenuService,
    private geolocation : Geolocation,
    private cdrio       : CdrioService,
    private order       : OrderServiceService,
    private bd          : AngularFirestore 
  ) { }

  ngOnInit() {
    this.kompaId = this.route.snapshot.params['id'];
    this.rid     = this.route.snapshot.params['rid'];
    this.precio  = this.route.snapshot.params['precio'];
    this.cantidad= this.route.snapshot.params['cant'];
    this.from    = this.route.snapshot.params['from'];
    this.name    = this.route.snapshot.params['name'];
    this.price   = this.route.snapshot.params['price'];
    this.type    = this.route.snapshot.params['super'];

    console.log('from',this.kompaId);

    if(this.from !=  'carrito'){
      this.tipo = 'delivery';
      console.log('tipo', this.tipo);
    }

    console.log(this.precio);
    this.ISV = Math.trunc(this.precio * 0.15);
    this.ISVM = Number(this.price) * 0.15;
    console.log('envio',this.envio);
    this.loadPlato();
    this.getPosition();

    this.orderColection = this.bd.collection<OrderI>('Order');
    this.ordergeneral = this.orderColection.snapshotChanges().pipe(map( actions =>{
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id   = a.payload.doc.id;
        return {id, ...data};
      });
    }
  ));

    this.getOneOrder(this.kompaId).subscribe( res => {
      this.test = res;
      this.origen = res.clienteub;
      this.destino = res.ubicacion;
      console.log('orden res',res);
    })
  }

  getOneOrder(id : string){
    return this.orderColection.doc<OrderI>(id).valueChanges();
  }

  loadPlato(){
    if (this.rid == 'CSbCSCOhoxMNnneTOpvv'){
      this.cdrio.getOne(this.kompaId).subscribe( res => {
        this.menu = res;
      });
    } else if (this.rid == '645ReJeOxbCh04AbWp0f'){
      this.nichas.getOne(this.kompaId).subscribe( res => {
        this.menu = res; 
      });
    }
  }

  getPosition(){
    this.geolocation.getCurrentPosition().then( position => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      console.log('ubicación', lat, lng);

      let ubicacion = {lat: lat, lng: lng};
      if (this.rid == 'CSbCSCOhoxMNnneTOpvv'){
        
          const oub = new google.maps.LatLng(ubicacion);
          const dub = new google.maps.LatLng(this.cdrioub);
    
          const dist = google.maps.geometry.spherical.computeDistanceBetween(oub,dub);
          const line = Math.trunc(dist/1000);
          console.log('distancia en KM', line);
    
          if (line <= 1.5){
            this.envio =  60;
          } else if ( line > 1.5 && line <= 4.5 ){
            this.envio = 75;
          } else if (line > 4.5 && line <= 9){
            this.envio = 90;
          } else if (line > 9){
            this.envio = 150;
          }
          this.total = Number(this.precio) + Number(this.ISV) + Number(this.envio);
    
          
          console.log('envio: ', this.envio);
          console.log('total: ', this.total);
      } else if (this.rid == '645ReJeOxbCh04AbWp0f'){
          const oub = new google.maps.LatLng(ubicacion);
          const dub = new google.maps.LatLng(this.nichasub);
    
          const dist = google.maps.geometry.spherical.computeDistanceBetween(oub,dub);
          const line = Math.trunc(dist/1000);
          console.log('distancia en KM', line);
    
          if (line <= 1.5){
            this.envio =  60;
          } else if ( line > 1.5 && line <= 4.5 ){
            this.envio = 75;
          } else if (line > 4.5 && line <= 9){
            this.envio = 90;
          } else if (line > 9){
            this.envio = 150;
          }
          this.total = Number(this.precio) + Number(this.ISV) + Number(this.envio);
    
          
          console.log('envio: ', this.envio);
          console.log('total: ', this.total);
      } else if (this.type == 'mandado'){
        this.total = Number(this.price) + Number(this.ISVM);
        this.header = 'Kompa Mandadito';
      }
    });
  }

}
