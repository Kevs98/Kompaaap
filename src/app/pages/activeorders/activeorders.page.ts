import { AngularFirestore } from '@angular/fire/firestore';
import { OrderI } from 'src/app/models/order.interface';
import { ClientorderService } from './../../services/clientorder.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-activeorders',
  templateUrl: './activeorders.page.html',
  styleUrls: ['./activeorders.page.scss'],
})
export class ActiveordersPage implements OnInit {

  usuario = firebase.auth().currentUser;
  order   : OrderI[];
  id      = '';
  flag    = '';

  constructor( private orderService : ClientorderService, private bd : AngularFirestore) { }

  ngOnInit() {
    this.orderService.getAll().subscribe( res => {
      this.order = res;
      if (this.order.length > 0){
        this.flag = 'si';
      } else {
        this.flag = 'no';
      }
      for( let i = 0; i<this.order.length; i++){
        this.id  = this.order[i].id;
      }
      console.log('id',this.id);
    });
  }

  delete(){
    let deleteDoc = this.bd.collection('Order').doc(this.id).delete();
    alert('Su orden fue cancelada');
  }

}
