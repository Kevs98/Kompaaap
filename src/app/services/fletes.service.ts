import { DriversI } from 'src/app/models/drivers.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class FletesService {

  private fletesCollection : AngularFirestoreCollection<DriversI>;
  private fletes : Observable<DriversI[]>;

  constructor(db : AngularFirestore) {
    this.fletesCollection = db.collection<DriversI>('Fletes');
    this.fletes = this.fletesCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getFlete(){
     return this.fletes;
   }
}
