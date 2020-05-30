import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class FontaneriaService {

  private fontaneriaCollection : AngularFirestoreCollection<PeopleI>;
  private fontanero : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.fontaneriaCollection = db.collection<PeopleI>('Fontaneria');
    this.fontanero = this.fontaneriaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getFontaneros(){
     return this.fontanero;
   }
}
