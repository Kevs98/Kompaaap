import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';
import { ListI } from '../models/list.interface';

@Injectable({
  providedIn: 'root'
})
export class JardineriaService {

  private jardineriaCollection : AngularFirestoreCollection<PeopleI>;
  private jardinero : Observable<PeopleI[]>;

  private jardineriaList : AngularFirestoreCollection<ListI>;
  private Lista : Observable<ListI[]>;

  constructor(db : AngularFirestore) {
    this.jardineriaCollection = db.collection<PeopleI>('Jardineria');
    this.jardinero = this.jardineriaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
    this.jardineriaList = db.collection<PeopleI>('Jardineria List');
    this.Lista = this.jardineriaList.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getJardineros(){
     return this.jardinero;
   }

   getLista(){
     return this.Lista;
   }

   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<PeopleI>(id).valueChanges());
    return this.jardineriaCollection.doc<PeopleI>(id).valueChanges();
   }
}
