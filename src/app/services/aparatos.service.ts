import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class AparatosService {

  private aparatosCollection : AngularFirestoreCollection<PeopleI>;
  private aparatos : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.aparatosCollection = db.collection<PeopleI>('Aparatos');
    this.aparatos = this.aparatosCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getAparato(){
     return this.aparatos;
   }
}
