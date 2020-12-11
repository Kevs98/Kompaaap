import { AngularFirestore } from '@angular/fire/firestore';
import { CartI } from './../../models/cart.interface';
import { Component, OnInit } from '@angular/core';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cartdetail',
  templateUrl: './cartdetail.page.html',
  styleUrls: ['./cartdetail.page.scss'],
})
export class CartdetailPage implements OnInit {

  orders : CartI = {};
  id = '';

  constructor( 
    private cartService : AddToCartService, 
    private route : ActivatedRoute, 
    private bd : AngularFirestore,
    private router : Router) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.cartService.getOne(this.id).subscribe( res => {
      this.orders = res;
    })
  }

  delete(){
    let deleteDeoc = this.bd.collection('Cart').doc(this.id).delete();
    alert('La orden ha sido eliminada');
    // this.router.navigateByUrl('/carrito/0');
    window.location.href = '/carrito';
  }

}
