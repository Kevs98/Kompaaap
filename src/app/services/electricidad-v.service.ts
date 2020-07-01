import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';
import { ListI } from '../models/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ElectricidadVService {

  private electricidadCollection : AngularFirestoreCollection<PeopleI>;
  private electrico : Observable<PeopleI[]>;

  private electricidadList : AngularFirestoreCollection<ListI>;
  private Lista : Observable<ListI[]>;

  constructor(db : AngularFirestore) {
    this.electricidadCollection = db.collection<PeopleI>('Electricidad Automovil');
    this.electrico = this.electricidadCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getElectricos(){
     return this.electrico;
   }

   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<PeopleI>(id).valueChanges());
    return this.electricidadCollection.doc<PeopleI>(id).valueChanges();
   }
}
