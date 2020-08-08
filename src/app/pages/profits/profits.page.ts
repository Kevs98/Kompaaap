import { OrderI } from './../../models/order.interface';
import { Component, OnInit } from '@angular/core';
import { OrderprofitsService } from 'src/app/services/orderprofits.service';

@Component({
  selector: 'app-profits',
  templateUrl: './profits.page.html',
  styleUrls: ['./profits.page.scss'],
})
export class ProfitsPage implements OnInit {

  order : OrderI[];
  suma  : any = 0;

  constructor( private orderService : OrderprofitsService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe( res => {
      this.order = res;
      for (let i = 0; i<this.order.length; i++){
        this.suma = this.suma + Number(this.order[i].precio);
      }
    });
  }

}
