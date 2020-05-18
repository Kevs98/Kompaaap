import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catI } from '../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCollection : AngularFirestoreCollection<catI>;
  private category: Observable<catI[]>;
  
  constructor(db: AngularFirestore) {
    this.categoryCollection = db.collection<catI>('category');
    this.category = this.categoryCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a=>{
        const data = a.payload.doc.data();
        const id =a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
   }

  getCategory(){
    return this.category;
  }

  createCategory (category: catI) {
    return this.categoryCollection.add(category);
  }
}
