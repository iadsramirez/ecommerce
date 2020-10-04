import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss'],
  providers: [
    AuthService
  ]
})
export class HeaderOneComponent implements OnInit {
  
  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/logos/logoAralsoft.jpg'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  
  public stick: boolean = false;

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 300 && window.innerWidth > 400) { 
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }


  logout(){
    this.authSvc.logout();
  }

}
