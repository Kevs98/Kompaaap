import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class FloristeriaService {

  private floresCollection : AngularFirestoreCollection<PeopleI>;
  private flores : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.floresCollection = db.collection<PeopleI>('Floristeria');
    this.flores = this.floresCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getFlor(){
     return this.flores;
   }
}
