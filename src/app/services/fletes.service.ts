import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class FletesService {

  private fletesCollection : AngularFirestoreCollection<PeopleI>;
  private fletes : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.fletesCollection = db.collection<PeopleI>('Fletes');
    this.fletes = this.fletesCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getFlete(){
     return this.fletes;
   }
}
