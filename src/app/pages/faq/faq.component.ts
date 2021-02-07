import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
latitude:any;
longitude:any;

 title = 'Como usar el Componente Google Maps de Angular 9'; 

  center = {lat: -9.189967, lng: -75.015152};
  zoom = 15;
  display?: google.maps.LatLngLiteral;


  constructor() { }

  ngOnInit(): void {


    
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
