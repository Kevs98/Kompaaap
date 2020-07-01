import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleI } from '../models/people.interface';
import { ListI } from '../models/list.interface';

@Injectable({
  providedIn: 'root'
})
export class AlbañileriaService {

  private albaCollection : AngularFirestoreCollection<PeopleI>;
  private albañil : Observable<PeopleI[]>;

  private albaservices : AngularFirestoreCollection<ListI>;
  private lista : Observable<ListI[]>;

  constructor(db : AngularFirestore) {
    this.albaCollection = db.collection<PeopleI>('Albañileria');
    this.albañil = this.albaCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;   
        console.log('data', data);    
        return {id, ...data};
      });
    }
    ));

    this.albaservices = db.collection<ListI>('Carpintería List');
    this.lista = this.albaservices.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        console.log('aqui los datos',data);
        
        return {id, ...data};
      });
    }
    ));
   }

   getAlbañiles(){
     return this.albañil;
   }

   getLista(){   
     return this.lista;
   }

   getOne(id: string){
    // console.log('ver',this.acaCollection.doc<PeopleI>(id).valueChanges());
    return this.albaCollection.doc<PeopleI>(id).valueChanges();
   }
}
