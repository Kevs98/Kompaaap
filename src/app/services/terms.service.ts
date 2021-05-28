import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { termsI } from '../models/terms.interface';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TermsService {

  private termsCollection : AngularFirestoreCollection<termsI>;
  private terms : Observable<any>;
  user = firebase.auth().currentUser;
  name = this.user.displayName;

  constructor( private bd : AngularFirestore) { 
    this.termsCollection = bd.collection<termsI>('Terms');
    this.terms = this.termsCollection.snapshotChanges().pipe( map( actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
  }

  getTerms(){
    return this.terms;
  }

  saveData(){
    const data = {
      name : this.name,
      id : this.user.uid,
      accept : 1
    }
    console.log(data);
    this.termsCollection.add(data);
  }
}
