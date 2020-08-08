import { Component, OnInit } from '@angular/core';
import { VIPservicesService } from '../../services/vipservices.service';
import { kompasI } from '../../models/kompa.interface';

@Component({
  selector: 'app-vipservices',
  templateUrl: './vipservices.page.html',
  styleUrls: ['./vipservices.page.scss'],
})
export class VipservicesPage implements OnInit {

  Servicios : kompasI[];
  tipo = 'VIP';

  constructor( private vipService : VIPservicesService) { }

  ngOnInit() {
    this.vipService.getMethods().subscribe( res => {
      this.Servicios = res;
    });
  }

  test(){
    alert('test succesfull');
  }

  vipUnable(){
    alert('Esta categoria estará disponible próximamente');
  }

}
