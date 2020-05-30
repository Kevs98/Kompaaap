import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class TaxiService {

  private taxiCollection : AngularFirestoreCollection<PeopleI>;
  private taxi : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.taxiCollection = db.collection<PeopleI>('Taxi');
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
}
