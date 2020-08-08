import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { OrderI } from '../models/order.interface';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  private orderCollection : AngularFirestoreCollection<OrderI>;
  private orders          : Observable<OrderI[]>;
  user                    = firebase.auth().currentUser;
  id = "";

  constructor(
    private bd : AngularFirestore, private route : ActivatedRoute
  ) { 
    this.orderCollection = bd.collection<OrderI>('Order', ref => ref.where('driverId', '==', this.user.uid).where('estado', '==', 0));
    this.orders = this.orderCollection.snapshotChanges().pipe( map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as OrderI;
        const id   = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
  }

  getjobs(){
    console.log('id', this.user.uid);
    return this.orders;
  }

  getOne( id : string){
    this.id = this.route.params['id'];
    console.log('idService',this.id);
    return this.orderCollection.doc<OrderI>(id).valueChanges();
  }
}
