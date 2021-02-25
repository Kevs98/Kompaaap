import { card } from './../../models/card.interface';
import { ActivatedRoute } from '@angular/router';
import { CardmethodService } from './../../services/cardmethod.service';
import { Component, OnInit } from '@angular/core';
import { AddcardService } from 'src/app/services/addcard.service';

@Component({
  selector: 'app-cardfn',
  templateUrl: './cardfn.page.html',
  styleUrls: ['./cardfn.page.scss'],
})
export class CardfnPage implements OnInit {

  card : card [];
  onecard = null;
  description = '';
  desc        = null;
  price       = null;
  org         = null;
  dest        = null;
  orderid     = null;
  did         = null;

  constructor(private cardService : AddcardService, private route : ActivatedRoute) { }

  ngOnInit() {

    this.desc    = this.route.snapshot.params['desc'];
    this.price   = this.route.snapshot.params['price'];
    this.orderid = this.route.snapshot.params['orderid'];
    this.did     = this.route.snapshot.params['did'];
    this.org     = this.route.snapshot.params['org'];
    this.dest    = this.route.snapshot.params['dest'];

    console.log('origent', this.org);
    console.log('destinot', this.dest);
    console.log('orderid', this.orderid);
    console.log('desc', this.desc);
    console.log('price', this.price); 
    console.log('did',this.did);

    this.cardService.getCards().subscribe( res => {
      this.card = res;
      // for(let i = 0; i<this.card.length; i++){
      //   this.description = this.card[i].cardDescription;
      //   console.log(this.description);
      // }
      console.log(this.card);
    })
  }

}
