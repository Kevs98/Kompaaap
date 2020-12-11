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
export class CerrajeriaVService {

  private cerrajeriaCollection : AngularFirestoreCollection<DriversI>;
  private cerrajero : Observable<DriversI[]>;

  private cerrajeriaList : AngularFirestoreCollection<ListI>;
  private Lista : Observable<ListI[]>;

  constructor(db : AngularFirestore) {
    this.cerrajeriaCollection = db.collection<DriversI>('Cerrajeria Automovil');
    this.cerrajero = this.cerrajeriaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
    this.cerrajeriaList = db.collection<DriversI>('CerrajeroA List');
    this.Lista = this.cerrajeriaList.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getCerrajeros(){
     return this.cerrajero;
   }

   getLista(){
     return this.Lista;
   }

   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<DriversI>(id).valueChanges());
    return this.cerrajeriaCollection.doc<DriversI>(id).valueChanges();
   }
}
