import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaCarreteraService {

  private asistentecarCollection : AngularFirestoreCollection<PeopleI>;
  private asistente : Observable<PeopleI[]>;

  constructor(db : AngularFirestore) {
    this.asistentecarCollection = db.collection<PeopleI>('Asistencia Carretera');
    this.asistente = this.asistentecarCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getACA(){
     return this.asistente;
   }
}
