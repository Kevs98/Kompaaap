import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class SpaService {

  private spaCollection : AngularFirestoreCollection<PeopleI>;
  private spa : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.spaCollection = db.collection<PeopleI>('Spa');
    this.spa = this.spaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getspas(){
     return this.spa;
   }
}
