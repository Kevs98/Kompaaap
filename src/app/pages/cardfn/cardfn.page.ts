import { ActivatedRoute } from '@angular/router';
import { CardmethodService } from './../../services/cardmethod.service';
import { Component, OnInit } from '@angular/core';
import { card } from '../../models/card.interface';

@Component({
  selector: 'app-cardfn',
  templateUrl: './cardfn.page.html',
  styleUrls: ['./cardfn.page.scss'],
})
export class CardfnPage implements OnInit {

  card : any;
  description = '';
  desc        = null;
  price       = null;

  constructor(private cardmService : CardmethodService, private route : ActivatedRoute) { }

  ngOnInit() {

    this.desc  = this.route.snapshot.params['desc'];
    this.price = this.route.snapshot.params['price'];
    console.log('desc', this.desc);
    console.log('price', this.price); 

    this.cardmService.UserRequestCards().subscribe( res => {
      this.card = res.userCards;
      for(let i = 0; i<this.card.length; i++){
        this.description = this.card[i].cardDescription;
        console.log(this.description);
      }
      console.log(this.card);
    })
  }

}
