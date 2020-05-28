import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { FileI } from '../models/file.interface';
import { FormI } from '../models/form.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private formCollection: AngularFirestoreCollection<FormI>;
  private forms: Observable<FormI[]>;
  private formDoc: AngularFirestoreDocument<FormI>;
  private filePath: any;
  private downloadURL;

  constructor( private bd: AngularFirestore, private storage: AngularFireStorage) { 
    this.formCollection =  bd.collection<FormI>('Formulario');
    this.forms = this.formCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as FormI;
        const id = a.payload.doc.id;
        return { id, ...data};
      });
    }
    ));
  }

  saveForm(post: FormI) {
    const postObj = {
       difficult: post.difficult,
       description: post.description,
       image: this.downloadURL
    }
    console.log(postObj);
    this.formCollection.add(postObj);
  }

  private uploadImage(post: FormI, image: FileI){
    this.filePath = `FormImage/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe( urlImage => {
            this.downloadURL = urlImage;
            this.saveForm(post);
            console.log(post);
          })
        })
      ).subscribe();  
  }

  uploadForm(post: FormI, image: FileI){
    this.uploadImage(post,image);
  }
}
