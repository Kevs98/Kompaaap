import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.page.html',
  styleUrls: ['./usercard.page.scss'],
})
export class UsercardPage implements OnInit {

  usuario ={
    Nombre:'',
    Apellido:'',
    Password:'',
    Email:'',
    Telefono:''
  }
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.usuario)
  }


}
