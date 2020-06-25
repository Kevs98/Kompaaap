import { Component, ViewChild, ElementRef} from '@angular/core';



declare var google : any;


@Component({
  selector: 'app-testcomponents',
  templateUrl: './testcomponents.page.html',
  styleUrls: ['./testcomponents.page.scss'],
})
export class TestcomponentsPage{

  map: any;
  @ViewChild('map',{ read : ElementRef, static : false }) mapRef: ElementRef;

  infoWindows: any = [];
  markers : any = [
    {
      title: "National Galery Art",
      latitude: "-17.824991",
      longitude: "31.049295"
    },
    {
      title: "West End Hospital",
      latitude: "-17.820987",
      longitude: "31.039682"
    },
    {
      title: "Dominican Convent School",
      latitude: "-17.822647",
      longitude: "31.052042"
    }
  ];


  constructor(  ) {
    
   }

   ionViewDidEnter(){
     this.showMap();
   }

   addMarkersToMap( markers ){
     for (let marker of markers) {
       let position = new google.maps.LatLng(marker.latitude, marker.longitude);
       let mapMarker = new google.maps.Marker({
         position: position,
         title: marker.title,
         latitude: marker.latitude,
         longitude: marker.longitude
       });

       mapMarker.setMap(this.map);
       this.addInfoWindowToMarker(mapMarker);
     }
   }

   addInfoWindowToMarker(marker){
     let infoWindowContent = '<div id="content" style="color: black!important;">' +
                                '<h2 id="firstHeading" classs="firstHeading">' + marker.title + '</h2>' +
                                '<p>Latitude: ' + marker.latitude + '</p>' +
                                '<p>Longitude: ' + marker.longitude + '</p>' +
                              '</div>';
                              
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
   }

   closeAllInfoWindows(){
     for (let window of this.infoWindows){
       window.close();
     }
   }

   showMap(){
     const location = new google.maps.LatLng(-17.824858, 31.053028);
     const options = {
       center: location,
       zoom: 15,
       disableDefaultUI: true
     }
     this.map = new google.maps.Map(this.mapRef.nativeElement, options);
     this.addMarkersToMap(this.markers);
   }


}
