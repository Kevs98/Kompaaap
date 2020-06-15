import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { kompasI } from '../models/kompa.interface';
import { servicesI } from '../models/serivices.interface';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class DeliveryjobsService {

  private deliveryCollection: AngularFirestoreCollection<kompasI>;
  private delivery: Observable<kompasI[]>;

  private deliveryJobsCollection: AngularFirestoreCollection<servicesI>
  private job: Observable<servicesI[]>;

  constructor(db: AngularFirestore) {
    this.deliveryCollection = db.collection<kompasI>('DeliveryCat');
    this.delivery = this.deliveryCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));

    this.deliveryJobsCollection = db.collection<servicesI>('envios');
    this.job = this.deliveryJobsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return{id, ...data};
      });
    }
    ));
    
   }

   getDeliveries(){
     return this.delivery;
   }

   getDeliveryJobs(){
     return this.job;
   }
}
