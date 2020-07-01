import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';
import { ListI } from '../models/list.interface';

@Injectable({
  providedIn: 'root'
})
export class MecanicaService {

  private mecanicosCollection : AngularFirestoreCollection<PeopleI>;
  private mecanico : Observable<PeopleI[]>;

  private mecanicosList : AngularFirestoreCollection<ListI>;
  private Lista : Observable<ListI[]>;

  constructor(db : AngularFirestore) {
    this.mecanicosCollection = db.collection<PeopleI>('Mecanicos ');
    this.mecanico = this.mecanicosCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
    this.mecanicosList = db.collection<PeopleI>('Mecanica List');
    this.Lista = this.mecanicosList.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getMecanicos(){
     return this.mecanico;
   }

   getLista(){
     return this.Lista;
   }

   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<PeopleI>(id).valueChanges());
    return this.mecanicosCollection.doc<PeopleI>(id).valueChanges();
   }
}
