import { Component } from '@angular/core';
import { LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage{
  destination:string;
  start:string;

  constructor( private launchNavigator: LaunchNavigator ) {
      this.start = "";
      this.destination = "Sytec, San Pedro Sula";
  }

  navigate(){
      let options: LaunchNavigatorOptions = {
          start: this.start
      };

      this.launchNavigator.navigate(this.destination, options)
          .then(
              success => alert('Launched navigator'),
              error => alert('Error launching navigator: ' + error)
          );
  }
}
