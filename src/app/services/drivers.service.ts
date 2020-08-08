import { FileI } from './../models/file.interface';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { DriversI } from '../models/drivers.interface';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  private driversCollection : AngularFirestoreCollection<DriversI>;
  private drivers : Observable<DriversI[]>;
  private driversDoc : AngularFirestoreDocument<DriversI>;
  private driver : Observable<DriversI>;
  private filePath : any;
  private filePath2 : any;
  private downloadURL : Observable<string>;
  private downloadURL2 : Observable<string>;
  estrellas = "5";

  user   = firebase.auth().currentUser;
  userId = this.user.uid; 

  constructor( 
    private bd : AngularFirestore,
    private storage : AngularFireStorage
  ) { 
    this.driversCollection = bd.collection<DriversI>('Drivers');
    this.drivers = this.driversCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ... data};
      });
    }
    ));
  }

  getDriver( id : string){
    return this.driversCollection.doc<DriversI>(id).valueChanges();
  }

  saveDriver( driver : DriversI){
    const driverObj = {
      userId     : this.userId,
      nombre     : driver.nombre,
      apellido   : driver.apellido,
      phone      : driver.phone,
      imgUrl     : this.downloadURL,
      imgCar     : this.downloadURL2,
      placa      : driver.placa,
      tipo       : driver.tipo,
      estrellas  : "5",
      modelo     : driver.modelo,
      estado     : 1
    }
    console.log('Resultado', driverObj);
    this.driversCollection.add(driverObj);
  }

  private uploadImage( driver : DriversI, imgProfile : FileI, imgCar : FileI){
    this.filePath  = `Drivers/${imgProfile.name}`;
    this.filePath2 = `Drivers/${imgCar.name}`;
    const fileRef  = this.storage.ref(this.filePath);
    const fileRef2 = this.storage.ref(this.filePath2);
    const task     = this.storage.upload(this.filePath, imgProfile);
    const task2    = this.storage.upload(this.filePath2, imgCar);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe( urlImage => {
            this.downloadURL = urlImage;
            console.log('URL IMAGE', urlImage);
            this.saveDriver(driver);
            console.log('Driver: ',driver);
          })
        })
      ).subscribe();
      
      task2.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef2.getDownloadURL().subscribe( urlImageCar => {
              this.downloadURL2 = urlImageCar;
              console.log('URL IMAGE CAR', urlImageCar);
            });
          })
        ).subscribe();
  }

  uploadDriver( driver : DriversI, imgPfrofile : FileI, imgCar : FileI){
    this.uploadImage(driver,imgPfrofile,imgCar);
  }
}
