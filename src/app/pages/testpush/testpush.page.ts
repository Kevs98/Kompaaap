import { oft } from './../../models/onlyfortest.interface';
import { CardmethodService } from './../../services/cardmethod.service';
import { Component, OnInit } from '@angular/core';
// import * as PixelPay from '@pixelpay/sdk';

declare global {
  interface Window{ PixelPay : any; }   
}

window.PixelPay = window.PixelPay || {};

@Component({
  selector: 'app-testpush',
  templateUrl: './testpush.page.html',
  styleUrls: ['./testpush.page.scss'],
})
export class TestpushPage implements OnInit {

  Test : oft = {};
  uri: string;
  name = "Kevin";
  email = "test@gmail.com";
  price = "30";
  constructor(private cardM : CardmethodService) { 
    
  }
  
  
  
  ngOnInit() {
    // console.log('a ver si lo imprimis');

    // this.cardM.TestNewURI(this.price, this.email, this.name).subscribe(res => {
    //   this.Test = res;
    //   this.uri = this.Test.url;
    //   console.log('res', this.uri);
    // });
    // PixelPay.setup('2212294583', 'ae2966c0153bd8d53c4b7b2ac4c27efd' ,'https://pixel-pay.com');
    // PixelPay.setup('FH3760687747', '6e4c9ecdf4d94aa49ffb77a6e' ,'https://ficohsa.pixelpay.app');

  }


  // pay(){
  //   this.cardM.Pay();
  //   console.log('url', this.uri);
  //   window.open(this.uri,'_self');
    
  // }

}
