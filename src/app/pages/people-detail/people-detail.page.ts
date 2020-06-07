import { Component, OnInit } from '@angular/core';
import { AcautoService } from '../../services/acauto.service';
import { PeopleI } from '../../models/people.interface';
import { ActivatedRoute } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';



@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.page.html',
  styleUrls: ['./people-detail.page.scss'],
})
export class PeopleDetailPage implements OnInit {

  peoples: PeopleI = {};
  kompaId = null;

  constructor(private service: AcautoService, private route: ActivatedRoute, private callNumber : CallNumber) { }

  ngOnInit() {
    this.kompaId = this.route.snapshot.params['id'];
    console.log('Este es el Id', this.kompaId);
    if(this.kompaId){
      this.loadPeople();
      console.log('Exito');
    }
    
    
  }

  prueba(celPhone: string){
    this.callNumber.callNumber(this.peoples.phone , true)
      .then(res => console.log('Launched Dialer', res))
      .catch( err => console.log('Error Launching Dialer', err));
  }
  
  loadPeople(){
    this.service.getOne(this.kompaId).subscribe(res => {
      this.peoples = res;
      console.log('aqui funciona', this.peoples)
    });
  }

}
