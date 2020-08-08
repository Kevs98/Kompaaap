import { OrderI } from './../../models/order.interface';
import { Component, OnInit } from '@angular/core';
import { JobshistoryService } from 'src/app/services/jobshistory.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jhistorydetail',
  templateUrl: './jhistorydetail.page.html',
  styleUrls: ['./jhistorydetail.page.scss'],
})
export class JhistorydetailPage implements OnInit {

  order : OrderI = {};
  id    = '';

  constructor( private orderService : JobshistoryService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loadOrder();
  }

  loadOrder(){
    this.orderService.getOne(this.id).subscribe( res =>{
      this.order = res;
    });
  }

}
