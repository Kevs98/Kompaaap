import { DriverMarketService } from './../../services/driver-market.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriversI } from 'src/app/models/drivers.interface';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.page.html',
  styleUrls: ['./thanks.page.scss'],
})
export class ThanksPage implements OnInit {

  KompaId  = null;
  nombre   = null;
  origen   = null;
  destino  = null;
  pid      = null;
  cancelar = 0;
  Peoples  : DriversI = {};

  constructor( private route : ActivatedRoute, private superService : DriverMarketService) { 
  }

  ngOnInit() {
    this.KompaId = this.route.snapshot.params['id'];
    this.nombre  = this.route.snapshot.params['name'];
    this.origen  = this.route.snapshot.params['origin'];
    this.destino = this.route.snapshot.params['destination']; 
    this.pid     = this.route.snapshot.params['pid'];
    console.log('id', this.pid);
    this.loadPeople();  
  }

  saveSupeMarket(){
    const order = {
      nombre    : 'Supermercado/Mandadito',
      cancelado : this.cancelar,
      // driverId  : this.Peoples.userId,
      // DName     : this.Peoples.nombre + ' ' + this.Peoples.apellido,
      // cliente   : this.usuario.displayName,
      // clienteID : this.usuario.uid,
      // clienteub : this.destinar,
      // ubicacion : this.origin,
      phone     : "97544506",
      estado    : 0
    }
  }

  loadPeople(){
    this.superService.getOne(this.pid).subscribe( res => {
      this.Peoples = res;
      console.log('res', res);
    })
  }

}
