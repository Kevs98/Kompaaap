import { Component, OnInit } from '@angular/core';
import { kompasI } from '../../models/kompa.interface';
import { KompaService } from '../../services/kompa.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-kompa-detail',
  templateUrl: './kompa-detail.page.html',
  styleUrls: ['./kompa-detail.page.scss'],
})
export class KompaDetailPage implements OnInit {

  Kompa: kompasI = {
    nombre_servicio: '',
    imgUrl: ''
  };
  KompaId = null;

  constructor(private route: ActivatedRoute, private nav: NavController, private kompaService: KompaService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.KompaId = this.route.snapshot.params['id'];
    if(this.KompaId){
      this.loadKompa();
    }
  }

  async loadKompa(){
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();
    this.kompaService.getKompa(this.KompaId).subscribe(res => {
      loading.dismiss();
      this.Kompa = res;
    });
  }

  async saveKompa(){
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();

    if(this.KompaId){
      //update
      this.kompaService.updateKompa(this.Kompa, this.KompaId).then (()=>{
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }else{
      //new
      this.kompaService.addKompa(this.Kompa).then (()=>{
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }

  OnRemove(Kompaid:string){
    this.kompaService.deleteKompa(Kompaid)
  }

}
