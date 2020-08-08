import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DriversService } from 'src/app/services/drivers.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { DriversI } from 'src/app/models/drivers.interface';
import * as firebase from 'firebase';
import { DriverwFilterService } from 'src/app/services/driverw-filter.service';

@Component({
  selector: 'app-kdashboard',
  templateUrl: './kdashboard.page.html',
  styleUrls: ['./kdashboard.page.scss'],
})
export class KdashboardPage implements OnInit {

  drivers : DriversI[];
  id      : string = ''; 

  constructor( private driverUpdate : DriverwFilterService, private db : AngularFirestore ) {
  }

  ngOnInit() {
    this.driverUpdate.getDrivers().subscribe( async res => {
      this.drivers = res;
      console.log('data', this.drivers);
      for (let i = 0; i<this.drivers.length; i++){
        this.id = this.drivers[i].id;
      }
      console.log('data', this.id);
    });
  }

  async available(){
    const dcollection = this.db.collection('Drivers').doc(this.test());
    const put = await dcollection.update({estado : 1});

    alert('En este momento está disponible para trabajos');
  }

  test(){
    return this.id;
  }

  async unavailable(){
    const dcollection = this.db.collection('Drivers').doc(this.test());
    const put = await dcollection.update({estado : 0});

    alert('En este momento ya no está disponible para trabajos');
  }

}
