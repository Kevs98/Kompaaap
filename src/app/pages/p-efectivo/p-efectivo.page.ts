import { MenuI } from 'src/app/models/menu.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NichasmenuService } from 'src/app/services/nichasmenu.service';

@Component({
  selector: 'app-p-efectivo',
  templateUrl: './p-efectivo.page.html',
  styleUrls: ['./p-efectivo.page.scss'],
})
export class PEfectivoPage implements OnInit {

  kompaId = null;
  rid = null;
  menu : MenuI = {};
  total = 0;
  cantidad = 0;
  ISV = 0;
  precio = 0;
  tipo = 'delivery';

  constructor(private route : ActivatedRoute, private nichas : NichasmenuService) { }

  ngOnInit() {
    this.kompaId = this.route.snapshot.params['id'];
    this.rid     = this.route.snapshot.params['rid'];
    this.precio  = this.route.snapshot.params['precio'];
    this.cantidad= this.route.snapshot.params['cant'];
    console.log(this.precio);
    this.ISV = this.precio * 0.15;
    this.total = Number(this.precio) + Number(this.ISV)
    this.loadPlato();
  }

  loadPlato(){
    this.nichas.getOne(this.kompaId).subscribe( res => {
      this.menu = res; 
    });
  }

}
