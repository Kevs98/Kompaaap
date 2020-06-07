import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class AcautoService {

  private acaCollection : AngularFirestoreCollection<PeopleI>;
  private aca : Observable<PeopleI[]>;
  private aca2 : Observable<PeopleI>; 
  private peopleDoc: AngularFirestoreDocument<PeopleI>;

  constructor(db : AngularFirestore) {
    this.acaCollection = db.collection<PeopleI>('AC Automovil');
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
    // console.log('ver',this.acaCollection.doc<PeopleI>(id).valueChanges());
    return this.acaCollection.doc<PeopleI>(id).valueChanges();
   }
}
