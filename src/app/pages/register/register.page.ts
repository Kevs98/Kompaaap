import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userI } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user : userI = new userI();

  constructor( private authService : AuthService, private router : Router) { }

  ngOnInit() {
  }

  async onRegister(){
    const user = await this.authService.Register(this.user);

    if( user ){
      console.log('Usuario registrado bajo el nombre de', user);
      this.router.navigateByUrl('/klogin');
    }
  }

}
