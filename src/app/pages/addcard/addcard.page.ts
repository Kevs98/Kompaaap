import { ActivatedRoute, Router } from '@angular/router';
import { CardmethodService } from './../../services/cardmethod.service';
import { card } from './../../models/card.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddcardService } from 'src/app/services/addcard.service';


@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.page.html',
  styleUrls: ['./addcard.page.scss'],
})
export class AddcardPage implements OnInit {

  cardExport : card = {};
  desc    = null;
  price   = null;
  orderid = null;

  createFormGroup(){
    return new FormGroup({
      cardDescription      : new FormControl(''),
      cardNumber           : new FormControl(''),
      expirationMonth      : new FormControl(''),
      expirationYear       : new FormControl(''),
      verification         : new FormControl('')
    });
  }

  addCard : FormGroup;

  constructor( 
    private addCardService : AddcardService,
    private cardmethod : CardmethodService,
    private route      : ActivatedRoute,
    private router     : Router
  ) { 
    this.addCard = this.createFormGroup();
  }

  ngOnInit() {
    this.desc    = this.route.snapshot.params['desc'];
    this.price   = this.route.snapshot.params['price'];
    this.orderid = this.route.snapshot.params['orderid'];
  }

  onSave( tarjeta : card){
    if ( this.desc == null && this.price == null){
      this.cardmethod.UserIncludeCard(tarjeta).subscribe( res => {
        this.cardExport = res;
        console.log(this.cardExport);
        if (this.cardExport.isApproved == false){
          alert('La tarjeta no es valida favor intentar nuevamente');
        } else {
          this.addCardService.guardarTarjeta(tarjeta, this.cardExport.cardTokenId);
          alert('Tarjeta agregada con exito');
        }
      });
    } else if ( this.desc != null && this.price != null){
      this.cardmethod.UserIncludeCard(tarjeta).subscribe( res => {
        this.cardExport = res;
        console.log(this.cardExport);
        if (this.cardExport.isApproved == false){
          alert('La tarjeta no es valida favor intentar nuevamente');
        } else {
          this.addCardService.guardarTarjeta(tarjeta, this.cardExport.cardTokenId);
          alert('Tarjeta agregada con exito');
          this.router.navigateByUrl('/cardfn/'+this.orderid+'/'+this.desc+'/'+this.price);
        }
      });
    }
  }

}
