import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { card } from '../models/card.interface';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AddcardService {

  private cardColection : AngularFirestoreCollection<card>;
  user   = firebase.auth().currentUser;
  userId = this.user.uid;

  constructor( private bd : AngularFirestore) { 
    this.cardColection = bd.collection<card>('Card');
  }

  guardarTarjeta( Card : card, cardToken : string){
    const cardObj = {
      cardDescription : Card.cardDescription,
      cardNumber      : Card.cardNumber,
      expirationMonth : Card.expirationMonth,
      expirationYear  : Card.expirationYear,
      verification    : Card.verification,
      userId          : this.userId,
      cardTokenId     : cardToken
    }

    console.log('Data para BD', cardObj);
    console.log('user', this.user);
    this.cardColection.add(cardObj);
  }
}
