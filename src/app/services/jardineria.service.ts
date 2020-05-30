import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class JardineriaService {

  private jardineriaCollection : AngularFirestoreCollection<PeopleI>;
  private jardinero : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.jardineriaCollection = db.collection<PeopleI>('Jardineria');
    this.jardinero = this.jardineriaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getJardineros(){
     return this.jardinero;
   }
}
