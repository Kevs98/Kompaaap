import { OrderI } from './../models/order.interface';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PeopleI } from '../models/people.interface';
import { userI } from '../models/user.interface';
import { AuthService } from './auth.service';
import { CartI } from '../models/cart.interface';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService{

  private cartCollection : AngularFirestoreCollection<CartI>
  private cart : Observable<any>
  testn = firebase.auth().currentUser;
  uid = this.testn.uid;

  constructor( private authService : AuthService, private bd : AngularFirestore) {
    this.cartCollection = this.bd.collection<CartI>('Cart', ref => ref.where('userid', '==', this.uid).where('completo', '==', 1));
    this.cart = this.cartCollection.snapshotChanges().pipe( map ( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
  }

  obtenerCarrito(){
    return this.cart;
  }
}
