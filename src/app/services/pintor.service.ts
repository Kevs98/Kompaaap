import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class PintorService {
  
  private pintorCollection : AngularFirestoreCollection<PeopleI>;
  private pintor : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.pintorCollection = db.collection<PeopleI>('Pintor');
    this.pintor = this.pintorCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getPintores(){
     return this.pintor;
   }
}
