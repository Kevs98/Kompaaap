import { ListI } from './../models/list.interface';
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

  private pintorList : AngularFirestoreCollection<ListI>;
  private Lista : Observable<ListI[]>;

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
    this.pintorList = db.collection<PeopleI>('Pintor List');
    this.Lista = this.pintorList.snapshotChanges().pipe(map( actions => {
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

   getLista(){
     return this.Lista;
   }

   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<PeopleI>(id).valueChanges());
    return this.pintorCollection.doc<PeopleI>(id).valueChanges();
   }
}
