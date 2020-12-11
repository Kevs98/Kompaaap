import { DriversI } from 'src/app/models/drivers.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {

  private mensajeriaCollection : AngularFirestoreCollection<DriversI>;
  private mensajeros : Observable<DriversI[]>;

  constructor(db : AngularFirestore) {
    this.mensajeriaCollection = db.collection<DriversI>('Mensajeria Moto');
    this.mensajeros = this.mensajeriaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getMensaje(){
     return this.mensajeros;
   }
}
