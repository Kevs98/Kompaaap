import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormI } from 'src/app/models/form.interface';


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {

  forms: FormI[];
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

  constructor(private route: ActivatedRoute, private formService: UploadService) { 
    this.problemForm = this.CreateFormGroup();
  }

  ngOnInit() {
    // this.KompaId = this.route.snapshot.params['id'];
    //   console.log(this.KompaId);

    //   if(this.KompaId == 'AJfc7rElVk5nYewVAIQv'){
    //     console.log('Test Works');
    //   }
    //   else {
    //     console.log('Another Category of service');
    //   }
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
