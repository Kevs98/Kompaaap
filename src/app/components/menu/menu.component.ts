import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
// import { url } from 'inspector';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  pages = [
    {
      title: 'Categorias',
      url: '/categories',
      icon: 'copy'
    },
    {
      title: 'Hogar',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Vehiculo',
      url: '/automovil',
      icon: 'car-sport'
    }
  ];

  selectedPath = '';

  constructor( private router : Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }

  ngOnInit() {}

}
