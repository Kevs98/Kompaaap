import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  public email : string = '';

  constructor( private auth : AuthService, private alert : AlertController) { }

  ngOnInit() {
  }

  SendLink(){

    if (this.email != ''){
      this.auth.ResetPassword(this.email).then(() => {
      this.PresentAlert();
      }).catch(() => {
        console.log('error');
      })
    } else {
      alert('El email está vacio o no es valido 🚫');  
    }
  }

  async PresentAlert(){
    const alerta = await this.alert.create({
      header: '¡Excelente!',
      message: 'Se ha enviado un correo con un enlace para reestablecer su contraseña 🙂',
      buttons: ['Aceptar']  
    });

    await alerta.present();
  }

}
