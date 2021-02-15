import { Component, OnInit } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-testpush',
  templateUrl: './testpush.page.html',
  styleUrls: ['./testpush.page.scss'],
})
export class TestpushPage implements OnInit {

  constructor(private fcm : FCM) { }

  ngOnInit() {
    console.log('a ver si lo imprimis');

    this.fcm.getToken().then(token => {
      console.log('TOKEN', token);
    });
  }

}
