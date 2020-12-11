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
export class FloristeriaService {

  private floresCollection : AngularFirestoreCollection<DriversI>;
  private flores : Observable<DriversI[]>;

  private floresList : AngularFirestoreCollection<ListI>;
  private Lista : Observable<ListI[]>;

  constructor(db : AngularFirestore) {
    this.floresCollection = db.collection<DriversI>('Floristeria');
    this.flores = this.floresCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
    this.floresList = db.collection<DriversI>('Floristeria List');
    this.Lista = this.floresList.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getFlor(){
     return this.flores;
   }

   getLista(){
     return this.Lista;
   }

   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<DriversI>(id).valueChanges());
    return this.floresCollection.doc<DriversI>(id).valueChanges();
   }
}
