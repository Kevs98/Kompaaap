import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private comprasCollection : AngularFirestoreCollection<PeopleI>;
  private compras : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.comprasCollection = db.collection<PeopleI>('Compras');
    this.compras = this.comprasCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getCompras(){
     return this.compras;
   }
}
