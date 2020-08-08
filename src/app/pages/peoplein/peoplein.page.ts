import { Component, OnInit } from '@angular/core';
import { ACHogarService } from '../../services/achogar.service';
import { AlbañileriaService } from '../../services/albañileria.service';
import { PeopleI } from '../../models/people.interface';
import { ActivatedRoute } from '@angular/router';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { from } from 'rxjs';
import { BarberiaService } from 'src/app/services/barberia.service';
import { BellezaService } from 'src/app/services/belleza.service';
import { CerrajeriaHService } from 'src/app/services/cerrajeria-h.service';
import { ComprasService } from 'src/app/services/compras.service';
import { ElectricidadHService } from 'src/app/services/electricidad-h.service';
import { FontaneriaService } from 'src/app/services/fontaneria.service';
import { JardineriaService } from 'src/app/services/jardineria.service';
import { PintorService } from 'src/app/services/pintor.service';
import { SpaService } from 'src/app/services/spa.service';
import { AcautoService } from 'src/app/services/acauto.service';
import { CerrajeriaVService } from 'src/app/services/cerrajeria-v.service';
import { ElectricidadVService } from 'src/app/services/electricidad-v.service';
import { GruaService } from 'src/app/services/grua.service';
import { LlanteraService } from 'src/app/services/llantera.service';
import { MecanicaService } from 'src/app/services/mecanica.service';
import { PinturaService } from 'src/app/services/pintura.service';
import { TaxiService } from 'src/app/services/taxi.service';
import { AsistHogarService } from 'src/app/services/asist-hogar.service';
import { AparatosService } from 'src/app/services/aparatos.service';
import { FloristeriaService } from 'src/app/services/floristeria.service';
import { ReparacionesHogarService } from 'src/app/services/reparaciones-hogar.service';
import { MensajeriaService } from 'src/app/services/mensajeria.service';
import { FletesService } from 'src/app/services/fletes.service';
import { AsistenciaCarreteraService } from 'src/app/services/asistencia-carretera.service';
import { DeliveryService } from 'src/app/services/delivery.service';


@Component({
  selector: 'app-peoplein',
  templateUrl: './peoplein.page.html',
  styleUrls: ['./peoplein.page.scss'],
})
export class PeopleinPage implements OnInit {

  peoples : PeopleI[];
  KompaId = null;
  rid     = null;
  precio  = null;
  cantidad= null;
  from    = null;
  tipo    = null;

  constructor(
    private achService : ACHogarService,  
    private route : ActivatedRoute,
    private albaService : AlbañileriaService,
    private barberService : BarberiaService,
    private bellezaService : BellezaService,
    private cerrajeroService : CerrajeriaHService,
    private comprasService : ComprasService,
    private electricosService : ElectricidadHService,
    private fonteneroService :  FontaneriaService,
    private jardineroService : JardineriaService,
    private pintorService : PintorService,
    private spaService : SpaService,
    private acaService : AcautoService,
    private cerrajeriaService : CerrajeriaVService,
    private electricidadService : ElectricidadVService,
    private gruaService : GruaService,
    private llanteraService : LlanteraService,
    private mecanicaService : MecanicaService,
    private pinturaService : PinturaService,
    private taxiService : TaxiService,
    private asistH : AsistHogarService,
    private aparatoService : AparatosService,
    private FloreService : FloristeriaService,
    private reparacioneService : ReparacionesHogarService,
    private mensajeriaService : MensajeriaService,
    private fleteService : FletesService,
    private ACAService : AsistenciaCarreteraService,
    private deliveryService : DeliveryService
    ) { }

  ngOnInit() {
    this.KompaId = this.route.snapshot.params['id'];
    this.rid     = this.route.snapshot.params['rid'];
    this.precio  = this.route.snapshot.params['precio'];
    this.cantidad= this.route.snapshot.params['cant'];
    this.from    = this.route.snapshot.params['from'];
    this.tipo    = this.route.snapshot.params['tipo'];
      console.log(this.KompaId);

      if(this.KompaId == 'AJfc7rElVk5nYewVAIQv'){
        console.log('Albañileria');
        this.albaService.getAlbañiles().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'fsSWfiajwpDVrAqWUUYg'){
        console.log('A/C');
        this.achService.getACH().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'MICcYGMJErc8oNyxdTAJ'){
        console.log('Barberia');
        this.barberService.getBarberos().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == '8QruJKHUfeYRjhxNWxSP'){
        console.log('Belleza');
        this.bellezaService.getBellezas().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'X33bE75x3j6Rnap0X6GU'){
        console.log('Cerrajeria Hogar');
        this.cerrajeroService.getCerrajeros().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'DTkMRspnMcSfkKQMb91C'){
        console.log('Compras');
        this.comprasService.getCompras().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'xNuFnQFF8rDtDBOLZDnG'){
        console.log('Electricidad');
        this.electricosService.getElectricos().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'mDTK1YyyUuZZ133uB2Dv'){
        console.log('Fontaneia');
        this.fonteneroService.getFontaneros().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'iVIS9VvNiSWYD1FUQEP4'){
        console.log('Jardineria');
        this.jardineroService.getJardineros().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'Pdn8AnyrG2OnELuB1Bz4'){
        console.log('Pintor Hogar');
        this.pintorService.getPintores().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'ZOkoAzVz5f2HrIgltZ5Y'){
        console.log('SPA');
        this.spaService.getspas().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == '8idjZF9Iyc6anqttSHXC'){
        console.log('AC Vehiculo');
        this.acaService.getACA().subscribe( res => {
          this.peoples = res;
        });
      }     
      else if (this.KompaId == 'SYVYXBmRZG6CWMHFfCDZ'){
        console.log('Cerrajeria Vehiculo');
        this.cerrajeriaService.getCerrajeros().subscribe( res => {
          this.peoples = res;
        });
      }  
      else if (this.KompaId == '8NrJCXGzTxYPI5tYVjpO'){
        console.log('Electricidad Vehiculo');
        this.electricidadService.getElectricos().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'OsfNxkuX2oOqH5HGGi1X'){
        console.log('Grua');
        this.gruaService.getGruas ().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'Zf9fT7alPBoWHIcuW5xV'){
        console.log('Llantera');
        this.llanteraService.getLlanteras ().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'KBvgrgG2XAMHnNlHyuMZ'){
        console.log('Mecanica');
        this.mecanicaService.getMecanicos().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'UBxXZUR0woZCitBWG4nU'){
        console.log('Pintura');
        this.pinturaService.getPinturas().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'LthsXwOEqEVPtn46p4Jp'){
        console.log('Taxi');
        this.taxiService.getTaxis().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'DmAaFKw0SIr3vPwYA3pw'){
        console.log('Asistencia Hogar');
        this.asistH.getASH().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'N2jQeyhAdIvfc8WTSIDb'){
        console.log('Aparatos');
        this.aparatoService.getAparato().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'epg9wPolhJQqUl6fLvdd'){
        console.log('Floristería');
        this.FloreService.getFlor().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'wnz6QHZVYiq7hs4bBQyI'){
        console.log('Reparaciones del Hogar');
        this.reparacioneService.getReparacion().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == '5RflyA4cF66xDuUXYCI6'){
        console.log('Mensajeria de Motocicleta');
        this.mensajeriaService.getMensaje().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'FYMzqqSAU3yLIRZANujq'){
        console.log('Fletes');
        this.fleteService.getFlete().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'GGNLWz8gfrMuJ6rfLynp'){
        console.log('Asistencia en Carretera');
        this.ACAService.getACA().subscribe( res => {
          this.peoples = res;
        });
      }
      else if (this.KompaId == 'Yi6YGwJGFykzzbCcmErN' || this.rid == '645ReJeOxbCh04AbWp0f'){
        console.log('Delivery');
        this.deliveryService.getDelivery().subscribe( res => {
          this.peoples = res;
        });
      }
      else {
        console.log('Esta categoria no Existe');
      }
  }
}
