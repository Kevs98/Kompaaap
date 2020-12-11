import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { SuperMarketI } from '../models/supermarket.interface';

@Injectable({
  providedIn: 'root'
})
export class SupermarketService {

  supermarketCollection : AngularFirestoreCollection<SuperMarketI>;
  superMarket           : Observable<SuperMarketI[]>;

  constructor( private bd : AngularFirestore) { 
    this.supermarketCollection =  bd.collection<SuperMarketI>('SuperMercados');
    this.superMarket = this.supermarketCollection.snapshotChanges().pipe( map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id   = a.payload.doc.id;
        return {id, ...data}
      });
    }
    ));
  }

  getSuperMarkets(){
    return this.superMarket;
  }
}
