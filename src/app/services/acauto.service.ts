import { DriversI } from 'src/app/models/drivers.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class AcautoService {

  private acaCollection : AngularFirestoreCollection<DriversI>;
  private aca : Observable<DriversI[]>;
  private aca2 : Observable<DriversI>; 
  private peopleDoc: AngularFirestoreDocument<DriversI>;

  constructor(db : AngularFirestore) {
    this.acaCollection = db.collection<DriversI>('AC Automovil');
    this.aca = this.acaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getACA(){
     return this.aca;
   }
   
   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<DriversI>(id).valueChanges());
    return this.acaCollection.doc<DriversI>(id).valueChanges();
   }
}
