import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MenuI } from '../models/menu.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NichasmenuService {

  private nichasCollection : AngularFirestoreCollection<MenuI>
  private menu : Observable<MenuI[]>

  constructor( private db : AngularFirestore) {
    this.nichasCollection = db.collection<MenuI>('Nichas Burger');
    this.menu = this.nichasCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getMenu(){
     return this.menu;
   }

   getOne( id : string ){
    return this.nichasCollection.doc<MenuI>(id).valueChanges();
  }
}
