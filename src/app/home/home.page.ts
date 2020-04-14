import { Component, OnInit } from '@angular/core';
import { kompasI } from '../models/kompa.interface';
import { KompaService } from '../services/kompa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  Kompas: kompasI[];
  constructor(private kompaService: KompaService){}

  ngOnInit(){
    this.kompaService.getKompas().subscribe(res => {
      this.Kompas = res;
    });
  }

}
