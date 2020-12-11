import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { OrderI } from 'src/app/models/order.interface';
import { DanielaService } from 'src/app/services/daniela.service';
import { OrderServiceService } from 'src/app/services/order-service.service';

@Component({
  selector: 'app-jobscurrent',
  templateUrl: './jobscurrent.page.html',
  styleUrls: ['./jobscurrent.page.scss'],
})
export class JobscurrentPage implements OnInit {

  job : OrderI[];
  flag = '';
  usuario = firebase.auth().currentUser;

  constructor( private orderService : OrderServiceService, private dService : DanielaService) { }

  ngOnInit() {
    if ( this.usuario.uid == 'LjETEHBI6ngQFqwOTaFPhZFSxE83'){
      console.log('Test Works');
      this.dService.getJobs().subscribe( res => {
        this.job = res;
      });
    } else {
      this.orderService.getjobs().subscribe( res => {
        this.job = res;
        if (this.job.length > 0){
          this.flag = 'si';
        }else {
          this.flag = 'no';
        }
  
        console.log('flag',this.flag);
      });
    }
  }

}
