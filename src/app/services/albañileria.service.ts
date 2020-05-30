import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class AlbañileriaService {

  private albaCollection : AngularFirestoreCollection<PeopleI>;
  private albañil : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.albaCollection = db.collection<PeopleI>('Albañileria');
    this.albañil = this.albaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getAlbañiles(){
     return this.albañil;
   }
}
