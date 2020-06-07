import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class ReparacionesHogarService {

  private reparacionesCollection : AngularFirestoreCollection<PeopleI>;
  private reparaciones : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.reparacionesCollection = db.collection<PeopleI>('ReparacionesHogar');
    this.reparaciones = this.reparacionesCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getReparacion(){
     return this.reparaciones;
   }
}
