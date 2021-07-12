import { oft } from './../../models/onlyfortest.interface';
import { CardmethodService } from './../../services/cardmethod.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testpush',
  templateUrl: './testpush.page.html',
  styleUrls: ['./testpush.page.scss'],
})
export class TestpushPage implements OnInit {

  Test : oft = {};
  uri: string;

  constructor(private cardM : CardmethodService) { }

  ngOnInit() {
    console.log('a ver si lo imprimis');

    this.cardM.TestNewURI().subscribe(res => {
      this.Test = res;
      this.uri = this.Test.url;
      console.log('res', this.uri);
    });
  }

  pay(){
    console.log('url', this.uri);
    window.open(this.uri,'_self');
    
  }

}
