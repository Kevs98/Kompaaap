import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class AsistHogarService {

  private asistHogar : AngularFirestoreCollection<PeopleI>;
  private ash : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.asistHogar = db.collection<PeopleI>('Asist Hogar');
    this.ash = this.asistHogar.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getASH(){
     return this.ash;
   }
}
