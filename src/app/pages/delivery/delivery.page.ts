import { Component, OnInit } from '@angular/core';
import { kompasI } from '../../models/kompa.interface';
import { DeliveryjobsService } from '../../services/deliveryjobs.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {

  Services : kompasI[];

  constructor( private deliveryService : DeliveryjobsService) { }

  ngOnInit() {
    this.deliveryService.getDeliveries().subscribe( res => {
      this.Services = res;
    });
  }

}
