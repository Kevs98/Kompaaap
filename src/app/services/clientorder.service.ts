import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { OrderI } from '../models/order.interface';
@Injectable({
  providedIn: 'root'
})
export class ClientorderService {

  orderCollection : AngularFirestoreCollection<OrderI>;
  order           : Observable<OrderI[]>;
  usuario         = firebase.auth().currentUser;

  constructor( bd : AngularFirestore) { 
    this.orderCollection = bd.collection<OrderI>('Order', ref => ref.where('clienteID', '==', this.usuario.uid).where('estado','==',0));
    this.order = this.orderCollection.snapshotChanges().pipe( map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as OrderI;
        const id   = a.payload.doc.id;
        return {id, ...data}
      });
    }
    ));
  }

  getAll(){
    return this.order;
  }
}
