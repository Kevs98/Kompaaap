import { Component, OnInit } from '@angular/core';
import { OrderI } from 'src/app/models/order.interface';
import { OrderServiceService } from 'src/app/services/order-service.service';

@Component({
  selector: 'app-jobscurrent',
  templateUrl: './jobscurrent.page.html',
  styleUrls: ['./jobscurrent.page.scss'],
})
export class JobscurrentPage implements OnInit {

  job : OrderI[];

  constructor( private orderService : OrderServiceService) { }

  ngOnInit() {
    this.orderService.getjobs().subscribe( res => {
      this.job = res;
    });
  }

}
