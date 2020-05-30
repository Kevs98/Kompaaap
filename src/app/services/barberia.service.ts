import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class BarberiaService {

  private barberiaCollection : AngularFirestoreCollection<PeopleI>;
  private barbero : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.barberiaCollection = db.collection<PeopleI>('Barberia');
    this.barbero = this.barberiaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getBarberos(){
     return this.barbero;
   }
}
