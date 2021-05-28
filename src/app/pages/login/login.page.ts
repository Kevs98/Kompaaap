import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userI } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  user : userI = new userI();

  constructor( private authService : AuthService, private router : Router) { }

  ngOnInit() {
    this.authService.getUserAuth().subscribe(user => {
      if (user.photoURL == null){
        this.router.navigateByUrl('/kdashboard');
      } else if( user != null){
        this.router.navigateByUrl('/termsandconditions');
      }
    });
  }

  prox(){
    alert('Aun no disponible');
  }

  async onLogin(){
    const user = await this.authService.loginWithGoogle();

    if ( user ){
      console.log('Usuario Logeado con Exito');
      this.router.navigateByUrl('/categories');
    }
  }

  loginGoogle(){
    this.authService.loginWithGoogle().then(() => {
      this.router.navigate(['/categories']);
    }).catch( err => {
      alert(err);
    })
  }

  loginFacebook(){
    this.authService.loginWithFacebook().then( res => {
      this.router.navigate(['/categories']);
    }).catch( err => {
      alert(JSON.stringify(err));
    })
    // alert('Próximamente');
  }

  
}
