import { termsI } from './../../models/terms.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { TermsService } from './../../services/terms.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.page.html',
  styleUrls: ['./termsandconditions.page.scss'],
})
export class TermsandconditionsPage implements OnInit {

  private termsCollection : AngularFirestoreCollection<termsI>;
  private terms : Observable<any>;
  user = firebase.auth().currentUser;
  termsacc : termsI[];
  aceptar = 0;

  constructor( 
    private termsS : TermsService, 
    private router : Router, 
    private bd : AngularFirestore,
    private alert : AlertController
    ) { 
    this.termsCollection = this.bd.collection('Terms', ref => ref.where('id', '==', this.user.uid).where('accept', '==', 1));
    this.terms = this.termsCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }
    ));
  }

  ngOnInit() {
    this.Validate().subscribe( res => {
      this.termsacc = res;
      console.log(this.termsacc);

      for (let i = 0; i<this.termsacc.length; i++){
        this.aceptar = this.termsacc[i].accept;
      }
      console.log('a', this.aceptar);
      if(this.aceptar == 1){
        this.router.navigateByUrl('/categories');
      }
    })
  }

  Validate(){
    return this.terms;
  }

  Save(){
    this.Validate().subscribe( res => {
      this.termsacc = res;
      console.log(this.termsacc);

      for (let i = 0; i<this.termsacc.length; i++){
        this.aceptar = this.termsacc[i].accept;
      }
      console.log('a', this.aceptar);
      if(this.aceptar == 1){
        this.router.navigateByUrl('/categories');
      } else {
        this.PresentAlert();
      }
    })
  }

  async PresentAlert(){
    const alerta = await this.alert.create({
      header: 'Desea aceptar los terminos de KompaApp',
      message: 'Al aceptar los terminos y condiciones será redirigido a la pagina principal de KompaApp',
      buttons: [{
        text : 'Cancelar',
        role : 'cancel',
        handler: () => {
          alert('No puedes continuar sin aceptar los terminos y condiciones');
        }
      },
      {
        text: 'Aceptar',
        handler: () => {
          this.termsS.saveData();
        }
      }
    ]
    });

    await alerta.present();
  }

}
