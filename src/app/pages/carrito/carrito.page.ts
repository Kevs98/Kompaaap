import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { CartI } from './../../models/cart.interface';
import { Component, OnInit } from '@angular/core';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { MenuI } from 'src/app/models/menu.interface';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  Items : CartI[];
  total_suma: any = 0;
  uid = 'fPQVN6NwcPfBUsw2tD5TofOV28d2';
  rid = '';
  id  = '';
  from = 'carrito';
  test = '';

  constructor( private addToCartService : AddToCartService, private bd : AngularFirestore) { }

  ngOnInit() {
    this.addToCartService.obtenerCarrito().subscribe( res => {
      this.Items = res;
      console.log(this.Items);
      for (let i = 0; i<this.Items.length; i++){
        this.total_suma = this.total_suma + Number(this.Items[i].precio);
        this.id = this.Items[i].id;
        this.test = this.test + this.Items[i].nombre + ':' + this.Items[i].cantidad + ',' + ' ';
        this.rid = this.Items[i].rid;
      }
      console.log('name', this.test);
      console.log('id',this.id);
      console.log('suma', this.total_suma);
    })
  }

  
}

