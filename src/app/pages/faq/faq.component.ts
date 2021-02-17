import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, from } from 'rxjs';
import{GMapService} from '../../servicios/GMapService';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  @ViewChild('map') mapRef: ElementRef;
latitude:any;
longitude:any;

 title = 'Como usar el Componente Google Maps de Angular 9'; 

  center = {lat: -9.189967, lng: -75.015152};
  zoom = 15;
  display?: google.maps.LatLngLiteral;


  constructor(private gmapService: GMapService) { }

  ngOnInit(): void {

    this.gmapService.initMap(this.mapRef.nativeElement, {
      center: {lat: 1234.1234, lng: 1234.1234},
      scrollwheel: true,
      zoom: 8
    });
    
    
  }






  
getLocation(address: string): Observable<any> {
    console.log('Getting address: ', address);
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
        geocoder.geocode({
            'address': address
        }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                observer.next(results[0].geometry.location);
                observer.complete();
            } else {
                console.log('Error: ', results, ' & Status: ', status);
                observer.error();
            }
        });
    });
}
﻿


// Get Current Location Coordinates
private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }


  
}
