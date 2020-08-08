import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private deliveryCollection : AngularFirestoreCollection<PeopleI>;
  private deliveries : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.deliveryCollection = db.collection<PeopleI>('Drivers', ref => ref.where('tipo','==', 'Delivery').where('estado','==',1));
    this.deliveries = this.deliveryCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getDelivery(){
     return this.deliveries;
   }

   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<PeopleI>(id).valueChanges());
    return this.deliveryCollection.doc<PeopleI>(id).valueChanges();
   }
}
