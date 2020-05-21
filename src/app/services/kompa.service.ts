import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { kompasI } from '../models/kompa.interface';
import { FileI } from '../models/file.interface';

@Injectable({
  providedIn: 'root'
})
export class KompaService {

  private kompasCollection : AngularFirestoreCollection<kompasI>;
  private kompas: Observable<kompasI[]>;
  private filePath: any;  
  private downloadURL: Observable<string>;

  
  constructor(db: AngularFirestore) {
    this.kompasCollection = db.collection<kompasI>('Kompas');
    this.kompas = this.kompasCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

   getKompas(){
     return this.kompas;
   }

   getKompa(id:string){
    return this.kompasCollection.doc<kompasI>(id).valueChanges();
   }

   updateKompa(kompa:kompasI, id:string){
     return this.kompasCollection.doc(id).update(kompa);
   }


   addKompa(kompa:kompasI){
     return this.kompasCollection.add(kompa);
   }

   deleteKompa(id:string){
    return this.kompasCollection.doc(id).delete();
   }

  //  private uploadImage(image: FileI){
  //   this.filePath = `images/${image.name}`;
  //   const fileRef =this.storage.ref(this.filePath);
  //   const task = this.storage.upload(this.filePath, image);
  //   task.snapshotChanges().pipe(finalize(() =>{
  //     fileRef.getDownloadURL().subscribe(urlImage => {
  //       this.downloadURL = urlImage;
  //       console.log('URL-IMAGE', urlImage);
  //     });
  //   })
  //   ).subscribe();
  //  }

  //  guardar(file: FileI){
  //    this.uploadImage(file);
  //  }
   
}
