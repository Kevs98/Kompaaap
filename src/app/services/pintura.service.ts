import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class PinturaService {

  private pinturaCollection : AngularFirestoreCollection<PeopleI>;
  private pintura : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.pinturaCollection = db.collection<PeopleI>('Pintura');
    this.pintura = this.pinturaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getPinturas(){
     return this.pintura;
   }
}
