import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { kompasI } from '../models/kompa.interface';

@Injectable({
  providedIn: 'root'
})
export class VIPservicesService {

  private vipcollection: AngularFirestoreCollection<kompasI>;
  private VIP: Observable<kompasI[]>;

  constructor(db: AngularFirestore) {
    this.vipcollection = db.collection<kompasI>('ServciosVIP');
    this.VIP = this.vipcollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getMethods(){
     return this.VIP;
   }
   getMethod(id:string){
    return this.vipcollection.doc<kompasI>(id).valueChanges();
   }
}
