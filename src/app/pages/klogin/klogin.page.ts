import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userI } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-klogin',
  templateUrl: './klogin.page.html',
  styleUrls: ['./klogin.page.scss'],
})
export class KloginPage implements OnInit {

  user : userI = new userI();

  constructor( private authService : AuthService, private router : Router) { }

  ngOnInit() {
    this.authService.getUserAuth().subscribe(user => {
      if (user != null){
        this.router.navigateByUrl('/kdashboard');
      }
    });
  }

  async onLogin(){
    const user = await this.authService.Login(this.user);

    if ( user ){
      console.log('Usuario Logeado con Exito', user);
      this.router.navigateByUrl('/kdashboard');
    }
  }

}
