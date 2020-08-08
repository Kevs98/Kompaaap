import { Component, OnInit } from '@angular/core';
import { OrderI } from 'src/app/models/order.interface';
import { JobshistoryService } from 'src/app/services/jobshistory.service';

@Component({
  selector: 'app-jobhistory',
  templateUrl: './jobhistory.page.html',
  styleUrls: ['./jobhistory.page.scss'],
})
export class JobhistoryPage implements OnInit {

  order : OrderI[];

  constructor( private jobHistory : JobshistoryService) { }

  ngOnInit() {
    this.jobHistory.getAllOrders().subscribe( res => {
      this.order = res;
    });
  }
}
