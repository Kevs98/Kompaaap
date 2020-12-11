import { map } from 'rxjs/operators';
import { OrderI } from 'src/app/models/order.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DanielaService {

  private orderCollection : AngularFirestoreCollection<OrderI>;
  private orders          : Observable<OrderI[]>;

  constructor( private bd : AngularFirestore, private route : ActivatedRoute) { 
    this.orderCollection = bd.collection<OrderI>('Order', ref => ref.where('estado', '==', 0));
    this.orders = this.orderCollection.snapshotChanges().pipe( map (actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as OrderI;
        const id   = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
  }

  getJobs(){
    return this.orders;
  }

  getOne( id : string){
    id = this.route.params['id'];
    console.log('idService', id);
    return this.orderCollection.doc<OrderI>(id).valueChanges();
  }
}
