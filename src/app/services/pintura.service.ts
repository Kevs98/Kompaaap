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
export class PinturaService {

  private pinturaCollection : AngularFirestoreCollection<DriversI>;
  private pintura : Observable<DriversI[]>;

  private pinturaList : AngularFirestoreCollection<ListI>;
  private Lista : Observable<ListI[]>;

  constructor(db : AngularFirestore) {
    this.pinturaCollection = db.collection<DriversI>('Pintura');
    this.pintura = this.pinturaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
    this.pinturaList = db.collection<DriversI>('PinturaA List');
    this.Lista = this.pinturaList.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getPinturas(){
     return this.pintura;
   }

   getLista(){
     return this.Lista;
   }

   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<DriversI>(id).valueChanges());
    return this.pinturaCollection.doc<DriversI>(id).valueChanges();
   }
}
