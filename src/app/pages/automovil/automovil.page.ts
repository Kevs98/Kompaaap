import { Component, OnInit } from '@angular/core';
import { kompasI } from '../../models/kompa.interface';
import { AutomovilService } from '../../services/automovil.service';

@Component({
  selector: 'app-automovil',
  templateUrl: './automovil.page.html',
  styleUrls: ['./automovil.page.scss'],
})
export class AutomovilPage implements OnInit {

  Kompas: kompasI[];

  constructor(private autoService: AutomovilService) { }

  ngOnInit() {
    this.autoService.getKompas().subscribe(res => {
      this.Kompas = res;
    });
  }

}
