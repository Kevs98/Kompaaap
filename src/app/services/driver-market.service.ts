import { DriversI } from 'src/app/models/drivers.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { PeopleI } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class DriverMarketService {

  private driverColection : AngularFirestoreCollection<DriversI>;
  private driver          : Observable<DriversI[]>;

  constructor( private db : AngularFirestore) { 
    this.driverColection = db.collection<DriversI>('Drivers', ref => ref.where('tipo', '==', 'Supermercado/Mandaditos').where('estado','==', 1));
    this.driver          =this.driverColection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id   = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
  }

  getDrivers(){
    return this.driver;
  }

  getOne(id : string){
    return this.driverColection.doc<DriversI>(id).valueChanges();
  }
}
