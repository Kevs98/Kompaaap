import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { OrderI } from '../models/order.interface';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class OrderwFilterService {

  orderCollection : AngularFirestoreCollection<OrderI>;
  order           : Observable<OrderI[]>
  usuario         = firebase.auth().currentUser;

  constructor( bd : AngularFirestore) {
    this.orderCollection = bd.collection<OrderI>('Drivers', ref => ref.where('userId', '==', this.usuario.uid));
    this.order = this.orderCollection.snapshotChanges().pipe( map ( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as OrderI;
        const id   = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getOrder(){
     return this.order;
   }
}
