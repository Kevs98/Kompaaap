import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class AcautoService {

  private acaCollection : AngularFirestoreCollection<PeopleI>;
  private aca : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.acaCollection = db.collection<PeopleI>('AC Automovil');
    this.aca = this.acaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getACA(){
     return this.aca;
   }
}
