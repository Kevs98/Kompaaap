import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { OrderI } from 'src/app/models/order.interface';
import { Component, OnInit } from '@angular/core';
import { JobshistoryService } from 'src/app/services/jobshistory.service';
import { OrderServiceService } from 'src/app/services/order-service.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';
import { OrderwFilterService } from 'src/app/services/orderw-filter.service';
import { CartI } from 'src/app/models/cart.interface';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { ThrowStmt } from '@angular/compiler';
import * as firebase from 'firebase';

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.page.html',
  styleUrls: ['./jobdetail.page.scss'],
})
export class JobdetailPage implements OnInit {

  order       : OrderI = {};
  orderCart   : CartI[];
  orderSelect : OrderI[];
  id          = '';
  ubication   = null;
  destination : string = '';
  start       : string = '';
  phone       : string = '';
  clienteub   : string = '';
  private cartCollection : AngularFirestoreCollection<CartI>
  private cart : Observable<any>
  flag = '';
  userflag = '';
  usuario = firebase.auth().currentUser;

  constructor( 
    private orderService   : OrderServiceService, 
    private route          : ActivatedRoute, 
    private launcNavigator : LaunchNavigator,
    private bd             : AngularFirestore,
    private callNumber     : CallNumber,
    private router         : Router,
    private Cart           : AddToCartService) { 
    }

  ngOnInit() {
    this.id          = this.route.snapshot.params['id'];
    this.destination = this.route.snapshot.params['ubi'];
    this.phone       = this.route.snapshot.params['phone'];
    this.clienteub   = this.route.snapshot.params['cub'];
    this.loadOrder();
    console.log('routeid',this.id);
    this.userflag = this.usuario.uid;
    
  }

  CartComplete(){
    this.cartCollection = this.bd.collection<CartI>('Cart');
    this.cartCollection.ref.get().then( resp => {
      console.log('pruva', resp.docs);
      let batch = this.bd.firestore.batch();

      resp.docs.forEach(userDocRef => {
        batch.update(userDocRef.ref, {'completo' : 0});
      })
      batch.commit().catch(err => console.error(err));
    }).catch(error  => console.error(error))
  }
  
  loadOrder(){
    this.orderService.getOne(this.id).subscribe( async res => {
      this.order     = res;
      this.ubication = res.ubicacion;
      console.log('bu', res.ubicacion);
    });
  }

  navigate(){
    let options : LaunchNavigatorOptions = {
      start : this.start
    };

    this.launcNavigator.navigate(this.destination, options)
      .then(
        success => alert('Launch Navigator'),
        error   => alert('Error launching navigator: ' + error)
      );
  }

  navigateClient(){
    let options : LaunchNavigatorOptions = {
      start : this.start
    };

    this.launcNavigator.navigate(this.clienteub, options)
      .then(
        success => alert('Launch Navigator'),
        error   => alert('Error launching navigator: ' + error)
      );
  }

  llamar(){
    this.callNumber.callNumber(this.phone , true)
      .then(res => console.log('Launched Dialer', res))
      .catch( err => console.log('Error Launching Dialer', err));
      console.log('Tel: ',this.phone);
      
  }

  async jobDone(){
    const oCollection = this.bd.collection('Order').doc(this.id);
    const put         = await oCollection.update({estado : 1});

    this.CartComplete();

    alert('Felicidades el trabajo esta completo');
    this.router.navigateByUrl('/jobscurrent');
  }

}
