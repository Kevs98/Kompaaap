import { SuperMarketI } from './../../models/supermarket.interface';
import { MarketListService } from './../../services/market-list.service';
import { Component, OnInit } from '@angular/core';
import { SuperI } from '../../models/super.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SupermarketService } from 'src/app/services/supermarket.service';

@Component({
  selector: 'app-superdetails',
  templateUrl: './superdetails.page.html',
  styleUrls: ['./superdetails.page.scss'],
})
export class SuperdetailsPage implements OnInit {

  private listImage : any;
  id = 'super';
  super : SuperMarketI[];

  createFormGroup(){
    return new FormGroup({
      userid : new FormControl(''),
      super  : new FormControl(''),
      otro   : new FormControl(''),
      list   : new FormControl('')
    });
  }

  SuperList : FormGroup;

  constructor( private router : Router, private marketListService : MarketListService, private superMarketService : SupermarketService) { 
    this.SuperList = this.createFormGroup();
  }

  ngOnInit(){
    this.superMarketService.getSuperMarkets().subscribe( res => {
      this.super = res;
    })
  }

  onSave(ML : SuperI){
    this.marketListService.uploadMarketList(ML, this.listImage);
    alert('Su Pedido fue enviado con éxito');
    this.onReset();
    this.router.navigateByUrl('/peoplein/'+this.id);
  }

  onReset(){
    this.SuperList.reset();
  }

  handleImage( event : any){

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = function(){
      let preview = document.getElementById('preview'),
            image = document.createElement('img');

      image.src =  reader.result as string;

      preview.innerHTML = '',
      preview.append(image);
    };

    this.listImage = event.target.files[0];
    console.log('Imagen',this.listImage);
  }


}
