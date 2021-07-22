import { FileI } from './../models/file.interface';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { SuperI } from '../models/super.interface';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MarketListService {

  private marketListCollection : AngularFirestoreCollection<SuperI>;
  private marketList           : Observable<SuperI[]>;
  private filepath             : any;
  private downloadURL          : Observable<string>;

  user   = firebase.auth().currentUser;

  constructor( private bd : AngularFirestore, private storage : AngularFireStorage) { 
    this.marketListCollection = this.bd.collection<SuperI>('MarketList');
    this.marketList           = this.marketListCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data =  a.payload.doc.data();
        const id   = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
  }

  getMarketList(){
    return this.marketList;
  }
 
  saveMarketList( ML : SuperI){
    const SuperList = {
      super     : ML.super,
      otro      : ML.otro,
      userid    : this.user.uid,
      listImage : this.downloadURL
    }
    console.log('RF', SuperList);
    this.marketListCollection.add(SuperList);
  }

  private uploadImage( ML : SuperI, imgList : FileI){
    this.filepath = `Super/${imgList.name}`;
    const fileRef = this.storage.ref(this.filepath);
    const task    = this.storage.upload(this.filepath, imgList);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe( urlimage => {
        this.downloadURL = urlimage;
        console.log('URL_IMAGE', urlimage);
        this.saveMarketList(ML);
        console.log('ML: ', ML);
      })
    })
    ).subscribe();
  }

  uploadMarketList( ML : SuperI, listImage : FileI){
    this.uploadImage(ML, listImage)
  }
}
