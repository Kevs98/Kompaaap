import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { OrderI } from '../models/order.interface';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderprofitsService {
  
  private orderCollection : AngularFirestoreCollection<OrderI>;
  private orders          : Observable<OrderI[]>;
  user                    = firebase.auth().currentUser;

  constructor( private bd : AngularFirestore) { 
    this.orderCollection = bd.collection<OrderI>('Order', ref => ref.where('driverId', '==', this.user.uid));
    this.orders = this.orderCollection.snapshotChanges().pipe( map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as OrderI;
        const id   = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
  }

  getOrders(){
    return this.orders;
  }
}
