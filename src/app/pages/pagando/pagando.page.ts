import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NichasmenuService } from 'src/app/services/nichasmenu.service';
import { MenuI } from 'src/app/models/menu.interface';

@Component({
  selector: 'app-pagando',
  templateUrl: './pagando.page.html',
  styleUrls: ['./pagando.page.scss'],
})
export class PagandoPage implements OnInit {

  KompaId = null;
  rid = null;
  cantidad = null;
  precio = null;
  menu : MenuI = {};

  constructor( private route : ActivatedRoute, private nichas : NichasmenuService) { }

  ngOnInit() {
    this.KompaId = this.route.snapshot.params['id'];
    this.rid = this.route.snapshot.params['rid'];
    this.precio = this.route.snapshot.params['precio'];
    this.cantidad = this.route.snapshot.params['cant'];
    console.log('Kompa', this.KompaId);
  }


  prox(){
    alert('Esta funcion aún no esta disponible');
  }

  loadPlato(){
    this.nichas.getOne(this.KompaId).subscribe( res => {
      this.menu = res;  
      console.log(res.precio);
    });
}

}
