import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';
import { ListI } from '../models/list.interface';

@Injectable({
  providedIn: 'root'
})
export class CerrajeriaHService {

  private cerrajeriaCollection : AngularFirestoreCollection<PeopleI>;
  private cerrajero : Observable<PeopleI[]>;

  private cerrajeriaList : AngularFirestoreCollection<ListI>;
  private Lista : Observable<ListI[]>;

  constructor(db : AngularFirestore) {
    this.cerrajeriaCollection = db.collection<PeopleI>('Cerrajeria Hogar');
    this.cerrajero = this.cerrajeriaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
    this.cerrajeriaList = db.collection<PeopleI>('CerrajeroH List');
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
    // console.log('ver',this.acaCollection.doc<PeopleI>(id).valueChanges());
    return this.cerrajeriaCollection.doc<PeopleI>(id).valueChanges();
   }
}
