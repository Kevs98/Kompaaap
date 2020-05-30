import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class CerrajeriaVService {

  private cerrajeriaCollection : AngularFirestoreCollection<PeopleI>;
  private cerrajero : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.cerrajeriaCollection = db.collection<PeopleI>('Cerrajeria Automovil');
    this.cerrajero = this.cerrajeriaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getCerrajeros(){
     return this.cerrajero;
   }
}
