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
export class JardineriaService {

  private jardineriaCollection : AngularFirestoreCollection<DriversI>;
  private jardinero : Observable<DriversI[]>;

  private jardineriaList : AngularFirestoreCollection<ListI>;
  private Lista : Observable<ListI[]>;

  constructor(db : AngularFirestore) {
    this.jardineriaCollection = db.collection<DriversI>('Jardineria');
    this.jardinero = this.jardineriaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
    this.jardineriaList = db.collection<DriversI>('Jardineria List');
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
    // console.log('ver',this.acaCollection.doc<DriversI>(id).valueChanges());
    return this.jardineriaCollection.doc<DriversI>(id).valueChanges();
   }
}
