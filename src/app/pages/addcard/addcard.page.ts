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

  constructor( private addCardService : AddcardService, private cardmethod : CardmethodService) { 
    this.addCard = this.createFormGroup();
  }

  ngOnInit() : void {
  }

  onSave( tarjeta : card){
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
  }

}
