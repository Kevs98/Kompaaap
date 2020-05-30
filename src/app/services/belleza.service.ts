import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class BellezaService {

  private bellezaCollection : AngularFirestoreCollection<PeopleI>;
  private belleza : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.bellezaCollection = db.collection<PeopleI>('Belleza');
    this.belleza = this.bellezaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getBellezas(){
     return this.belleza;
   }
}
