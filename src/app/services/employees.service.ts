import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { eI } from '../models/employees.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private employeesCollection : AngularFirestoreCollection<eI>;
  private employees: Observable<eI[]>;

  constructor( db: AngularFirestore) {
    this.employeesCollection = db.collection<eI>('employees');
    this.employees = this.employeesCollection.snapshotChanges().pipe(map( actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
  }

  getEmployees(){
    return this.employees;
  }
}
