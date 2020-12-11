import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DriversI } from '../models/drivers.interface';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class FontaneriaService {

  private fontaneriaCollection : AngularFirestoreCollection<DriversI>;
  private fontanero : Observable<DriversI[]>;

  private fontaneriaList : AngularFirestoreCollection<DriversI>;
  private Lista : Observable<DriversI[]>;

  constructor(db : AngularFirestore) {
    this.fontaneriaCollection = db.collection<DriversI>('Fontaneria');
    this.fontanero = this.fontaneriaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));

    this.fontaneriaList = db.collection<DriversI>('Fontaneria List');
    this.Lista = this.fontaneriaList.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getFontaneros(){
     return this.fontanero;
   }

   getLista(){
     return this.Lista;
   }

   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<DriversI>(id).valueChanges());
    return this.fontaneriaCollection.doc<DriversI>(id).valueChanges();
   }
}
