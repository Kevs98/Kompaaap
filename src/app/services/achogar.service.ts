import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';
import { ListI } from '../models/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ACHogarService {

  private achCollection : AngularFirestoreCollection<PeopleI>;
  private ach : Observable<PeopleI[]>;

  private achList : AngularFirestoreCollection<ListI>;
  private Lista : Observable<ListI[]>;

  constructor(db : AngularFirestore) {
    this.achCollection = db.collection<PeopleI>('AC Hogar');
    this.ach = this.achCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
    this.achList = db.collection<PeopleI>('ACH List');
    this.Lista = this.achList.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getACH(){
     return this.ach;
   }

   getOne( id : string ){
     return this.achCollection.doc<PeopleI>(id).valueChanges();
   }

   getLista(){
     return this.Lista;
   }
}
