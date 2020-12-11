import { DriversI } from 'src/app/models/drivers.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaCarreteraService {

  private asistentecarCollection : AngularFirestoreCollection<DriversI>;
  private asistente : Observable<DriversI[]>;
  

  constructor(db : AngularFirestore) {
    this.asistentecarCollection = db.collection<DriversI>('Asistencia Carretera');
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
