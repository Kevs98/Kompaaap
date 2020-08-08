import { Component, OnInit } from '@angular/core';
import { MenuI } from '../../models/menu.interface';
import { kompasI } from '../../models/kompa.interface';
import { NichasmenuService } from '../../services/nichasmenu.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-menu-restaurants',
  templateUrl: './menu-restaurants.page.html',
  styleUrls: ['./menu-restaurants.page.scss'],
})
export class MenuRestaurantsPage implements OnInit {

  Menu : MenuI[];
  id = null;

  constructor( private nichasService : NichasmenuService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.nichasService.getMenu().subscribe( res => {
      this.Menu = res;
    });
  }

  prox(){
    alert('esta funcion aun no esta disponible');
  }

}
