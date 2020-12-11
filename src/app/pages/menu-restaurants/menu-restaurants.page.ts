import { Component, OnInit } from '@angular/core';
import { MenuI } from '../../models/menu.interface';
import { kompasI } from '../../models/kompa.interface';
import { NichasmenuService } from '../../services/nichasmenu.service';
import { ActivatedRoute } from '@angular/router';
import { CdrioService } from 'src/app/services/cdrio.service';


@Component({
  selector: 'app-menu-restaurants',
  templateUrl: './menu-restaurants.page.html',
  styleUrls: ['./menu-restaurants.page.scss'],
})
export class MenuRestaurantsPage implements OnInit {

  Menu : MenuI[];
  id = null;

  constructor( 
    private nichasService : NichasmenuService,
    private route : ActivatedRoute,
    private cdrio : CdrioService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if(this.id == '645ReJeOxbCh04AbWp0f'){
      this.nichasService.getMenu().subscribe( res => {
        this.Menu = res;
      });
    } else if (this.id == 'CSbCSCOhoxMNnneTOpvv'){
      this.cdrio.getBeers().subscribe( res => {
        this.Menu = res;
      });
    }
  }

  prox(){
    alert('esta funcion aun no esta disponible');
  }

}
