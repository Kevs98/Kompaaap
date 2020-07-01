import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormI } from 'src/app/models/form.interface';
import { AlbañileriaService } from 'src/app/services/albañileria.service';
import { ListI } from '../../models/list.interface';
import { BarberiaService } from 'src/app/services/barberia.service';
import { BellezaService } from 'src/app/services/belleza.service';
import { CerrajeriaHService } from 'src/app/services/cerrajeria-h.service';
import { FontaneriaService } from 'src/app/services/fontaneria.service';
import { JardineriaService } from 'src/app/services/jardineria.service';
import { SpaService } from 'src/app/services/spa.service';
import { ACHogarService } from 'src/app/services/achogar.service';
import { ComprasService } from 'src/app/services/compras.service';
import { PintorService } from 'src/app/services/pintor.service';
import { AparatosService } from 'src/app/services/aparatos.service';
import { FloristeriaService } from 'src/app/services/floristeria.service';
import { ReparacionesHogarService } from 'src/app/services/reparaciones-hogar.service';
import { ElectricidadHService } from 'src/app/services/electricidad-h.service';
import { AsistHogarService } from 'src/app/services/asist-hogar.service';
import { CerrajeriaVService } from 'src/app/services/cerrajeria-v.service';
import { PinturaService } from 'src/app/services/pintura.service';
import { LlanteraService } from 'src/app/services/llantera.service';
import { MecanicaService } from 'src/app/services/mecanica.service';



@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {

  forms: FormI[];
  servicios : ListI[];
  name = '';
  private image: any;
  KompaId = null;

  CreateFormGroup(){
    return new FormGroup({
      difficult: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl('')
    });
  }

  problemForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formService: UploadService,
    private carpinteria : AlbañileriaService,
    private barberia : BarberiaService,
    private belleza : BellezaService,
    private cerrajeriaH : CerrajeriaHService,
    private fontaneria : FontaneriaService,
    private jardinera : JardineriaService,
    private spa : SpaService,
    private ACH : ACHogarService,
    private compras : ComprasService,
    private pintor : PintorService,
    private aparatos : AparatosService,
    private flores : FloristeriaService,
    private reparaciones : ReparacionesHogarService,
    private electricoH : ElectricidadHService,
    private asistenciaH : AsistHogarService,
    private cerrajeriaA : CerrajeriaVService,
    private pintura : PinturaService,
    private llantera : LlanteraService,
    private mecanica : MecanicaService
  ) { 
    this.problemForm = this.CreateFormGroup();
  }

  ngOnInit() {
    this.KompaId = this.route.snapshot.params['id'];
      console.log(this.KompaId);

      if(this.KompaId == 'AJfc7rElVk5nYewVAIQv'){
        console.log('Test Works');
        this.name = "Kompa Albañileria";
        this.carpinteria.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if ( this.KompaId == 'MICcYGMJErc8oNyxdTAJ'){
        this.name = "Kompa Barberia";
        this.barberia.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if (this.KompaId == '8QruJKHUfeYRjhxNWxSP') {
        this.name = "Kompa Belleza";
        this.belleza.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if (this.KompaId == 'X33bE75x3j6Rnap0X6GU') {
        this.name = "Kompa Cerrajería";
        this.cerrajeriaH.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if (this.KompaId == 'mDTK1YyyUuZZ133uB2Dv') {
        this.name = "Kompa Fontaneria"
        this.fontaneria.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if (this.KompaId == 'iVIS9VvNiSWYD1FUQEP4') {
        this.name = "Kompa Jardineria"
        this.jardinera.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if ( this.KompaId == 'ZOkoAzVz5f2HrIgltZ5Y') {
        this.name = "Kompa Spa";
        this.spa.getLista().subscribe( res => {
          this.servicios = res;
        }); 
      }
      if (this.KompaId == 'fsSWfiajwpDVrAqWUUYg'){
        this.name = "Kompa A/C Hogar"
        this.ACH.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if (this.KompaId == 'DTkMRspnMcSfkKQMb91C') {
        this.name = "Kompa Compras";
        this.compras.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if (this.KompaId == 'Pdn8AnyrG2OnELuB1Bz4'){
        this.name = "Kompa Pintor";
        this.pintor.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if (this.KompaId == 'N2jQeyhAdIvfc8WTSIDb') {
        this.name = "Kompa Aparatos";
        this.aparatos.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if ( this.KompaId == 'epg9wPolhJQqUl6fLvdd') {
        this.name = "Kompa Floristeria";
        this.flores.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if (this.KompaId == 'wnz6QHZVYiq7hs4bBQyI') {
        this.name = "Kompa Reparaciones";
        this.reparaciones.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if (this.KompaId == 'xNuFnQFF8rDtDBOLZDnG'){ 
        this.name = "Kompa Electricidad";
        this.electricoH.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if (this.KompaId == 'DmAaFKw0SIr3vPwYA3pw') {
        this.name = "Kompa Asistencia de Hogar";
        this.asistenciaH.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if (this.KompaId == 'SYVYXBmRZG6CWMHFfCDZ'){
        this.name = "Kompa Cerrajería";
        this.cerrajeriaA.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if (this.KompaId == 'UBxXZUR0woZCitBWG4nU'){
        this.name = "Kompa Pintura";
        this.pintura.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if (this.KompaId == 'Zf9fT7alPBoWHIcuW5xV'){
        this.name = "Kompa Llantera";
        this.llantera.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      if (this.KompaId == 'KBvgrgG2XAMHnNlHyuMZ'){
        this.name = "Kompa Mecánica";
        this.mecanica.getLista().subscribe( res => {
          this.servicios = res;
        });
      }
      else {
        console.log('Another Category of service');
      }
  }

  onResetForm(){
    this.problemForm.reset();
  }

  onSave(data: FormI){
    this.formService.uploadForm(data, this.image);
  }

  handleImage(event:any): void{
    this.image = event.target.files[0];
    console.log('Imagen', this.image);
  }
}
