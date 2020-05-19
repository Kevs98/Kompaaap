import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { kompasI } from '../models/kompa.interface';


@Injectable({
  providedIn: 'root'
})
export class AutomovilService {

  private autoCollection: AngularFirestoreCollection<kompasI>;
  private kompas: Observable<kompasI[]>;

  constructor(db: AngularFirestore) {
    this.autoCollection = db.collection<kompasI>('Automovil');
    this.kompas = this.autoCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getKompas(){
     return this.kompas;
   }

   getKompa(id:string){
     return this.autoCollection.doc<kompasI>(id).valueChanges();
   }
}
