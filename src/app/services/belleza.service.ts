import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';
import { ListI } from '../models/list.interface';
import { DriversI } from '../models/drivers.interface';

@Injectable({
  providedIn: 'root'
})
export class BellezaService {

  private bellezaCollection : AngularFirestoreCollection<DriversI>;
  private belleza : Observable<DriversI[]>;

  private BellezaList : AngularFirestoreCollection<ListI>;
  private Lista : Observable<ListI[]>;

  constructor(db : AngularFirestore) {
    this.bellezaCollection = db.collection<DriversI>('Belleza');
    this.belleza = this.bellezaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
    this.BellezaList = db.collection<DriversI>('Belleza List');
    this.Lista = this.BellezaList.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getBellezas(){
     return this.belleza;
   }

   getLista(){
     return this.Lista;
   }

   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<DriversI>(id).valueChanges());
    return this.bellezaCollection.doc<DriversI>(id).valueChanges();
   }
}
