import { map } from 'rxjs/operators';
import { CartI } from './../../models/cart.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { NichasmenuService } from '../../services/nichasmenu.service'
import { MenuI } from 'src/app/models/menu.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { userI } from 'src/app/models/user.interface';
import { Observable } from 'rxjs';
import { DriversI } from 'src/app/models/drivers.interface';
import { DriversService } from 'src/app/services/drivers.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {

  kompaId = null;
  rid = null;
  menu : MenuI = {};
  inicio = 1;
  precio = 0;
  cantidad = 1;
  user : userI = new userI();
  userid : string;
  private cartCollection   : AngularFirestoreCollection<CartI>
  private cart             : Observable<any>
  private driverCollection : AngularFirestoreCollection<DriversI>
  private drivers          : Observable<any>
  usuario = firebase.auth().currentUser;

  constructor( 
    private nichas : NichasmenuService,
    private route : ActivatedRoute, 
    private router : Router, 
    private enviarService : AddToCartService,
    private authService : AuthService,
    private bd : AngularFirestore,
    private driverService : DriversService) { }

  ngOnInit() {

    this.cartCollection = this.bd.collection<CartI>('Cart');
    this.cart = this.cartCollection.snapshotChanges().pipe( map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as CartI;
        const id = a.payload.doc.id;
        console.log('datos', data)
        return {id, ...data};
      });
    }
    ));

    this.kompaId = this.route.snapshot.params['id'];
    this.rid = this.route.snapshot.params['rid'];
    this.loadPlato();
    this.authService.getUserAuth().subscribe(user => {
      this.userid = user.uid;
    });
  }

  loadPlato(){
      this.nichas.getOne(this.kompaId).subscribe( res => {
        this.menu = res;  
        console.log(res.precio);
        if (this.inicio == 1){
          this.precio = res.precio;
        }
      });
  }

  incrementar() {
    var cant = parseInt((<HTMLInputElement>document.getElementById("item")).value);
    cant = ++this.inicio;
    if (cant > 1)
    {
      this.precio = this.menu.precio * cant
      console.log('precio', this.precio);
    }
    console.log('numero', cant);
    this.cantidad = cant;
    (<HTMLInputElement>document.getElementById("item")).value = cant.toString();
  }
     
  decrementar() {
    var cant = parseInt((<HTMLInputElement>document.getElementById("item")).value);
    cant = --this.inicio;
    if (cant < 1) {
      alert('La cantidad debe ser igual o mayor a 1');
      cant = 1;
      (<HTMLInputElement>document.getElementById("item")).value = cant.toString();
    }else if (cant >= 1){
      this.precio = this.menu.precio * cant
      console.log('precio', this.precio);
    }
    console.log('numero', cant);
    this.cantidad = cant;
    (<HTMLInputElement>document.getElementById("item")).value = cant.toString();
  }

  prox(){
    alert('Esta función aún no esta disponible');
  }

  addToCart(){
    // this.enviarService.sendObjectSource(this.menu);

    const Carrito = {
      nombre: this.menu.nombre,
      cantidad : this.cantidad,
      descripcion: this.menu.descripcion,
      precio: this.precio,
      userid: this.userid,
      completo: 1
    }

    console.log('obj', Carrito);
    this.cartCollection.add(Carrito);
    this.router.navigate(['/menu-restaurants/645ReJeOxbCh04AbWp0f']);

  }

}
