import { from } from 'rxjs';
import { card } from './../../models/card.interface';
import { CardmethodService } from './../../services/cardmethod.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-cardpay',
  templateUrl: './cardpay.page.html',
  styleUrls: ['./cardpay.page.scss'],
})
export class CardpayPage implements OnInit {

  token    = null;
  aproved  = null;
  caproved = null;
  ctoken   = null;
  desc     = null;
  pay      = null;
  org      = null;
  dest     = null;
  price    = null;
  did      = null;
  orderid  = null;
  payment  : card = {};
  charge   : card = {};
  user = firebase.auth().currentUser;
  username = this.user.displayName;

  constructor( 
    private route : ActivatedRoute,
    private cardService : CardmethodService,
    private router : Router
  ) { }

  ngOnInit() {

    this.token   = this.route.snapshot.params['token'];
    this.desc    = this.route.snapshot.params['desc'];
    this.price   = this.route.snapshot.params['price'];
    this.orderid = this.route.snapshot.params['orderid'];
    this.did     = this.route.snapshot.params['did'];
    this.org     = this.route.snapshot.params['org'];
    this.dest    = this.route.snapshot.params['dest'];

    console.log('orderid', this.orderid);
    console.log('token', this.token);
    console.log('desc', this.desc);
    console.log('price', this.price);
    console.log('did',this.did);
    console.log('origent', this.org);
    console.log('destinot', this.dest);
    // this.AppIncludeCharge();
    
    
  }

  // async AppIncludeCharge(){
  //   this.cardService.AppIncludeCharge(this.desc, this.price).subscribe(res => {
  //     this.payment = res;
  //     this.ctoken = this.payment.chargeTokenId;
  //     this.aproved = this.payment.isApproved;
  //     console.log('res', res);
  //     if (this.aproved = true) {
  //       this.cardService.UserViewCharge(this.ctoken).subscribe(res2 => {
  //         this.charge = res2;
  //         this.caproved = this.charge.isApproved;
  //         console.log('charge', res2);
  //       });
  //     } else {
  //       console.log('error con la tarjeta');
  //     }
  //   })
  //   var button = document.getElementById('pay');
  //   button.addEventListener('click', () => {
  //     if (this.caproved == true){
  //       this.cardService.UserApplyCharge(this.token, this.ctoken).subscribe( paym => {
  //         this.pay = paym;
  //         console.log('Payment', this.pay);
  //         if (this.pay.isApproved == false){
  //           alert('Lo sentimos el pago no pudo ser procesado: '+this.pay.reasonText);
  //         } else {
  //           alert('Su pago fue procesado con Exito');
  //           this.router.navigateByUrl('/thanks/'+this.did+'/'+this.orderid+'/'+this.org+'/'+this.dest+'/'+this.username+'/'+this.price);
  //         }
  //       });
  //     } else {
  //       alert('error');
  //     }
  //   })
  // }
}
