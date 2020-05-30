import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class LlanteraService {

  private llanteraCollection : AngularFirestoreCollection<PeopleI>;
  private llantera : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.llanteraCollection = db.collection<PeopleI>('Llantera');
    this.llantera = this.llanteraCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getLlanteras(){
     return this.llantera;
   }
}
