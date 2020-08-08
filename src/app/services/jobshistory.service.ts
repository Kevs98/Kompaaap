import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { OrderI } from '../models/order.interface';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class JobshistoryService {

  orderColection : AngularFirestoreCollection<OrderI>;
  order          : Observable<OrderI[]>
  usuario        = firebase.auth().currentUser;

  constructor( private bd : AngularFirestore ) {
    this.orderColection = bd.collection<OrderI>('Order', ref => ref.where('estado', '==', 1).where('driverId', '==', this.usuario.uid));
    this.order = this.orderColection.snapshotChanges().pipe( map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as OrderI;
        const id   = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
  }

  getAllOrders(){
    return this.order;
  }

  getOne( id : string){
    return this.orderColection.doc<OrderI>(id).valueChanges();
  }
}
