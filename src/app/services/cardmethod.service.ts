import { card } from './../models/card.interface';
import { chargeI } from './../models/chargeJSON.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import * as PixelPay from '@pixelpay/sdk';

declare global {
  interface Window { PixelPay: any; }
}

window.PixelPay = window.PixelPay || {};

@Injectable({
  providedIn: 'root'
})
export class CardmethodService {

  // API_URL = 'http://www.fttserver.com:4217/api';
  API_URI = 'https://ficohsa.pixelpay.app/sandbox/hosted/payment';

  // cardParams = {
  //   "applicationName": "KOMPA_TEST",
  //   "userName": "FTEXAMPLE", 
  //   "userPassword":"1234FT%"
  // }

  // includeCharge = {
  //   "applicationName": "KOMPA_TEST",
  //   "applicationPassword": "KMPFTTSEP090220%",
  //   "userName":"FTEXAMPLE",
  //   "chargeDescription":"Cargo de Ejemplo",
  //   "transactionCurrency":"CRC",
  //   "transactionAmount":"5000"
  // }

  constructor( private http : HttpClient) { }

  TestNewURI( price: string, email: string, name: string){
    let parameter = new HttpParams()
    .set('_key','s4ndb0x')
    .set('_cancel','https://www.ficohsa.com/quienes-somos/')
    .set('_complete','https://www.ficohsa.com/quienes-somos/')
    .set('_amount',price)
    .set('_order_id','8')
    .set('_email',email)
    .set('_first_name',name)
    .set('json','true');

    return this.http.post(this.API_URI,parameter.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });   


  }

  Pay(){
    var order = window.PixelPay.newOrder();

    order.setOrderID('12b');
    order.setFullName('Kevin Estrada');
    order.setEmail('kevinpalma657@gmail.com');
    order.setAmount(100);

    window.PixelPay.payOrder(order).then(function(res){
      console.log(res);
    }).catch(function(err){
      console.log('error', err);
    });
  }
  
  // charge( charge : chargeI){
  //   const obj = {
  //     applicationName: charge.applicationName,
  //     applicationPassword: charge.applicationPassword,
  //     userName: charge.userName,
  //     chargeDescription: charge.chargeDescription,
  //     transactionCurrency: charge.transactionCurrency,
  //     transactionAmount: charge.transactionAmount
  //   }
  //   console.log(obj);
  // }

  // UserRequestCards(){
  //   return this.http.post(this.API_URL+'/UserRequestCards', this.cardParams);
  // }

  // AppIncludeCharge(desc : string, price : string){
  //   const includeCharge = {
  //     "applicationName": "KOMPA_TEST",
  //     "applicationPassword": "KMPFTTSEP090220%",
  //     "userName":"FTEXAMPLE",
  //     "chargeDescription": desc,
  //     "transactionCurrency":"LPS",
  //     "transactionAmount": price
  //   }

  //   console.log(includeCharge);

  //   return this.http.post(this.API_URL+'/AppIncludeCharge',includeCharge);
  // }

  // UserViewCharge( token: string){
  //   const UserViewCharge = {
  //     "applicationName": "KOMPA_TEST",
  //     "userName": "FTEXAMPLE", 
  //     "userPassword":"1234FT%",
  //     "chargeTokenId": token 
  //   }
  //   return this.http.post(this.API_URL+'/UserViewCharge',UserViewCharge);
  // }

  // UserApplyCharge( token : string, ctoken : string){
  //   const UserApplyCharge = {
  //     "applicationName": "KOMPA_TEST",
  //     "userName": "FTEXAMPLE", 
  //     "userPassword":"1234FT%",
  //     "chargeTokenId": ctoken, 
  //     "cardTokenId": token
  //   }

  //   return this.http.post(this.API_URL+'/UserApplyCharge', UserApplyCharge);
  // }

  // UserIncludeCard( tarjeta : card){
  //   const UserIncludeCard = {
  //     "applicationName": "KOMPA_TEST",
  //     "userName": "FTEXAMPLE", 
  //     "userPassword":"1234FT%",
  //     "cardDescription": tarjeta.cardDescription,
  //     "primaryAccountNumber": tarjeta.cardNumber,
  //     "expirationMonth": tarjeta.expirationMonth,
  //     "expirationYear": tarjeta.expirationYear,
  //     "verificationValue": tarjeta.verification
  //   }

  //   return this.http.post(this.API_URL+'/UserIncludeCard', UserIncludeCard);
  // }
}   
