import { Component, OnInit } from '@angular/core';
import { FileI } from 'src/app/models/file.interface';
import { KompaService } from 'src/app/services/kompa.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {

  private image: any;
  KompaId = null;

  constructor(private service: KompaService, private route: ActivatedRoute, private nav: NavController, private loading: LoadingController) { }

  ngOnInit() {
    this.KompaId = this.route.snapshot.params['id'];
    if(this.KompaId){
      this.loadKompa();
      console.log(this.KompaId);
    }
  }
  async loadKompa(){
    const carga = await this.loading.create({
      message: 'Cargando...'
    });
    await carga.present();
    this.service.getKompa(this.KompaId).subscribe(res => {
      carga.dismiss();
    });
  }

  handleImage(event:any): void{
    this.image = event.target.files[0];
    console.log('Imagen', this.image);
  }

  // saveImage(data: FileI){
  //   this.service.guardar(this.image);
  // }

}
