import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';
import { DriversI } from '../models/drivers.interface';

@Injectable({
  providedIn: 'root'
})
export class TaxiService {

  private taxiCollection : AngularFirestoreCollection<DriversI>;
  private taxi : Observable<DriversI[]>;

  constructor(db : AngularFirestore) {
    this.taxiCollection = db.collection<PeopleI>('Drivers', ref => ref.where('tipo', '==', 'Transporte VIP').where('estado','==',1));
    this.taxi = this.taxiCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getTaxis(){
     return this.taxi;
   }

   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<PeopleI>(id).valueChanges());
    return this.taxiCollection.doc<PeopleI>(id).valueChanges();
   }
}
