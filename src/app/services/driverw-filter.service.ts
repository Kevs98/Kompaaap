import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { DriversI } from '../models/drivers.interface';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DriverwFilterService {

  driversCollection : AngularFirestoreCollection<DriversI>;
  driver            : Observable<DriversI[]>;
  usuario           = firebase.auth().currentUser;

  constructor( db : AngularFirestore) { 
    this.driversCollection = db.collection<DriversI>('Drivers', ref => ref.where('userId', '==', this.usuario.uid));
    this.driver = this.driversCollection.snapshotChanges().pipe( map ( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as DriversI;
        const id   = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
  }

  getDrivers(){
    return this.driver;
  }
}
