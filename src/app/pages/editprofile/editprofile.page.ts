import { Router } from '@angular/router';
import { DriversService } from './../../services/drivers.service';
import { DriversI } from './../../models/drivers.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  private imgProfile : any;
  private imgCar : any;

  createFormGroup(){
    return new FormGroup({
      useerId      : new FormControl(''), 
      nombre       : new FormControl(''),
      apellido     : new FormControl(''),
      phone        : new FormControl(''),
      profilePhoto : new FormControl(''),
      carPhoto     : new FormControl(''),
      placa        : new FormControl(''),
      tipo         : new FormControl(''),
      estrellas    : new FormControl(''),
      modelo       : new FormControl(''),
      estado       : new FormControl('')
    });
  }

  EditProfile : FormGroup;

  constructor( private driverService : DriversService, private router : Router) {
    this.EditProfile = this.createFormGroup();
   }

  ngOnInit() : void {
  }

  onSave( driver : DriversI){
    this.driverService.uploadDriver(driver, this.imgProfile, this.imgCar)
    alert('Su perfil fue actualizado');
    this.router.navigateByUrl('/kdashboard');
  }

  onReset(){
    this.EditProfile.reset();
  }

  handleImage(event:any): void{
    this.imgProfile = event.target.files[0];
    console.log('Imagen', this.imgProfile);
  }

  handleImage2(event:any): void{
    this.imgCar = event.target.files[0];
    console.log('Imagen_2', this.imgCar);
  }

}
