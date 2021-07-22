import { card } from './../../models/card.interface';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { DriversService } from './../../services/drivers.service';
import { DriversI } from './../../models/drivers.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NichasmenuService } from 'src/app/services/nichasmenu.service';
import { MenuI } from 'src/app/models/menu.interface';
import * as firebase from 'firebase';
import { OrderI } from 'src/app/models/order.interface';
import { Observable } from 'rxjs';
import { CardmethodService } from 'src/app/services/cardmethod.service';
import { oft } from 'src/app/models/onlyfortest.interface';
// import * as PixelPay from '@pixelpay/sdk';

declare global {
  interface Window { PixelPay: any; }
}

window.PixelPay = window.PixelPay || {};

@Component({
  selector: 'app-pagando',
  templateUrl: './pagando.page.html',
  styleUrls: ['./pagando.page.scss'],
})
export class PagandoPage implements OnInit {

  KompaId  = null;
  Peoples  : DriversI = {};
  cancelar    = 0;
  rid      = null;
  cantidad = null;
  precio   = null;
  name     = null;
  from     = null;
  orderid  = '';
  menu     : MenuI = {};
  user     = firebase.auth().currentUser;
  nombre   = null;
  origen   = null;
  destino  = null;
  super    = null;
  desc     = null;
  org      = null;
  dest     = null;
  price    = null;
  concept  = null;
  email    = null;

  Test : oft = {};
  uri: string;

  private orderCollection : AngularFirestoreCollection<OrderI>
  private orders          : Observable<any>


  constructor( private route : ActivatedRoute,
     private nichas : NichasmenuService,
     private driverService : DriversService,
     private bd : AngularFirestore,
     private geolocation : Geolocation,
     private router : Router,
     private cardpay : CardmethodService
    ) { }

  ngOnInit() {
    this.KompaId  = this.route.snapshot.params['id'];
    this.rid      = this.route.snapshot.params['rid'];
    this.precio   = this.route.snapshot.params['precio'];
    this.cantidad = this.route.snapshot.params['cant'];
    this.name     = this.route.snapshot.params['name'];
    this.from     = this.route.snapshot.params['from'];
    this.origen   = this.route.snapshot.params['origin'];
    this.destino  = this.route.snapshot.params['destination'];
    this.super    = this.route.snapshot.params['super']; 
    this.desc     = this.route.snapshot.params['desc'];
    this.org      = this.route.snapshot.params['origen'];
    this.dest     = this.route.snapshot.params['dest'];
    this.price    = this.route.snapshot.params['price'];
    this.nombre   = this.user.displayName;
    this.email    = this.user.email;
    console.log('Kompa', this.KompaId);
    console.log('tipo', this.super);
    console.log('orderid', this.orderid);   
    console.log('precio', this.price);
    console.log('origen',this.org);
    console.log('destino', this.dest);
    console.log('nombre', this.nombre);
    

    window.PixelPay.setup('FH3760687747', '378e73a2cff21642740370afae4ac0c9' ,'https://ficohsa.pixelpay.app');


    this.loadPeoples();
    
    this.orderCollection = this.bd.collection<OrderI>('Order', ref => ref.where('nombre', '==', this.desc));
    this.orders = this.orderCollection.snapshotChanges().pipe( map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id   = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));

    this.getOrders().subscribe( res => {
      for (let i = 0; i<res.length; i++){
        this.orderid = res[i].id;
      }
      console.log('id de orden', this.orderid);
    })
  }

  getOrders(){
    return this.orders;
  }


  prox(){
    alert('Esta funcion aún no esta disponible');
  }

  loadPlato(){
    this.nichas.getOne(this.KompaId).subscribe( res => {
      this.menu = res;  
      console.log(res.precio);
    });
  }

  home(){
    alert('No se puede pagar con Tarjeta');
  }

  loadPeoples(){
    this.driverService.getDriver(this.KompaId).subscribe( res => {
      this.Peoples = res;
      if (this.super == 'super'){

        this.geolocation.getCurrentPosition().then( pos => {
          let lat = pos.coords.latitude;
          let lng = pos.coords.longitude;
          console.log('coords',lat,lng);
          this.org = lat+','+lng;

          const order = {
            nombre    : this.super,
            precio    : null,
            cancelado : this.cancelar,
            cantidad  : null,
            driverId  : this.Peoples.userId,
            DName     : this.Peoples.nombre + '' + this.Peoples.apellido,
            cliente   : this.user.displayName,
            clienteID : this.user.uid,
            clienteub : this.org,
            ubicacion : null,
            phone     : "97544506",
            estado    : 0
          }
          console.log('restOrder',order);
          this.orderCollection.add(order);
          console.log('DRIVER', this.Peoples);

        })
      } else if (this.super == 'mandado'){
        const order = {
          nombre    : this.desc,
          precio    : this.price,
          cancelado : this.cancelar,
          cantidad  : null,
          driverId  : this.Peoples.userId,
          DName     : this.Peoples.nombre + '' + this.Peoples.apellido,
          cliente   : this.user.displayName,
          clienteID : this.user.uid,
          clienteub : this.org,
          ubicacion : this.dest,
          phone     : "97544554506",
          estado    : 0
        }

        console.log('restOrder',order);
        this.orderCollection.add(order);
        console.log('DRIVER', this.Peoples);
      }
    });
  }

  PaymentButton(){
    this.cardpay.Pay();
    window.open(this.uri, '_self');
  }

}
