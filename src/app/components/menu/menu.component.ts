import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
// import { url } from 'inspector';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  name: string;
  photo: string;

  pages = [
    {
      title: 'Categorías',
      url: '/categories',
      icon: 'copy'
    },
    {
      title: 'Hogar',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Vehículo',
      url: '/automovil',
      icon: 'car-sport'
    },
    {
      title: 'Delivery',
      url: '/delivery',
      icon: 'paper-plane'
    },
    {
      title: 'Transporte VIP',
      url: '/vipservices',
      icon: 'glasses'
    }
  ];

  selectedPath = '';

  constructor( private router : Router, private authService : AuthService, private afAuth : AngularFireAuth) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }

  ngOnInit() {
    this.authService.getUserAuth().subscribe( user => {
      this.name = user.displayName;
      this.photo = user.photoURL;
    })
  }

   onLogout(){
     console.log('Logout!');
     this.afAuth.auth.signOut();
     this.router.navigateByUrl('login');
   }

}
