import { map } from 'rxjs/operators';
import { MenuI } from './../models/menu.interface';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CdrioService {

  private beerCollection : AngularFirestoreCollection<MenuI>
  private beer           : Observable<MenuI[]>

  constructor( private bd : AngularFirestore) { 
    this.beerCollection = bd.collection<MenuI>('Cerveceria del rio');
    this.beer           = this.beerCollection.snapshotChanges().pipe( map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id   = a.payload.doc.id;
        return {id, ...data}
      });
    }
    ));
  }

  getBeers(){
    return this.beer;
  }

  getOne( id : string){
    return this.beerCollection.doc<MenuI>(id).valueChanges();
  }
}
