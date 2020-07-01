import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';
import { ListI } from '../models/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ReparacionesHogarService {

  private reparacionesCollection : AngularFirestoreCollection<PeopleI>;
  private reparaciones : Observable<PeopleI[]>;

  private reparacionesList : AngularFirestoreCollection<ListI>;
  private Lista : Observable<ListI[]>;

  constructor(db : AngularFirestore) {
    this.reparacionesCollection = db.collection<PeopleI>('ReparacionesHogar');
    this.reparaciones = this.reparacionesCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
    this.reparacionesList = db.collection<PeopleI>('Reparaciones List');
    this.Lista = this.reparacionesList.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getReparacion(){
     return this.reparaciones;
   }

   getLista(){
     return this.Lista;
   }

   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<PeopleI>(id).valueChanges());
    return this.reparacionesCollection.doc<PeopleI>(id).valueChanges();
   }
}
