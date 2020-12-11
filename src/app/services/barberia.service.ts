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
export class BarberiaService {

  private barberiaCollection : AngularFirestoreCollection<DriversI>;
  private barbero : Observable<DriversI[]>;

  private barberiaList : AngularFirestoreCollection<ListI>;
  private lista : Observable<ListI[]>;

  constructor(db : AngularFirestore) {
    this.barberiaCollection = db.collection<DriversI>('Barberia');
    this.barbero = this.barberiaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
    this.barberiaList = db.collection<DriversI>('Barbería List');
    this.lista = this.barberiaList.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getBarberos(){
     return this.barbero;
   }

   getLista(){
     return this.lista;
   }

   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<DriversI>(id).valueChanges());
    return this.barberiaCollection.doc<DriversI>(id).valueChanges();
   }
}
