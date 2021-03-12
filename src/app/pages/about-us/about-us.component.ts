import { Component, OnInit } from '@angular/core';
import { TeamSlider, TestimonialSlider } from '../../shared/data/slider';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { ComercioPK } from '../../modelo/ComercioPK';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  providers: [
    AuthService
],
})
export class AboutUsComponent implements OnInit {

  proveedor:any;
  constructor(private auth:AuthService,private router: Router) {

  auth.obtenerProveedor().subscribe(
    data=>{
     
      this.proveedor=data;
    }
  );
   }



  ngOnInit(): void {
  }


  redireccionar(nombre:any,imagen:any,data:any){

    console.log('COMPANIA objeto'+JSON.stringify(data));

    let nom:string;

    const comercial={valor:nom};

    localStorage.setItem('comercio', JSON.stringify(nombre));
    localStorage.setItem('comercioImg', imagen);
    console.log('data.comercioPK.idCompania:'+data.comercioPK.idCompania);
    this.router.navigateByUrl('/home/tools/'+data.comercioPK.idCompania+'/'+data.comercioPK.idAfiliado);
  }



  public TeamSliderConfig: any = TeamSlider;
  public TestimonialSliderConfig: any = TestimonialSlider;

  // Testimonial Carousel
  public testimonial = [{
    image: 'assets/images/testimonial/1.jpg',
    name: 'Mark jkcno',
    designation: 'Designer',
    description: 'you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  }, {
    image: 'assets/images/testimonial/2.jpg',
    name: 'Adegoke Yusuff',
    designation: 'Content Writer',
    description: 'you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  }, {
    image: 'assets/images/testimonial/1.jpg',
    name: 'John Shipmen',
    designation: 'Lead Developer',
    description: 'you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  }]

  // Team 
  public team = [{
    image: 'assets/images/team/1.jpg',
    name: 'Mark jkcno',
    designation: 'Designer'
  }, {
    image: 'assets/images/team/2.jpg',
    name: 'Adegoke Yusuff',
    designation: 'Content Writer'
  }, {
    image: 'assets/images/team/3.jpg',
    name: 'John Shipmen',
    designation: 'Lead Developer'
  }, {
    image: 'assets/images/team/4.jpg',
    name: 'Hileri Keol',
    designation: 'CEO & Founder at Company'
  }, {
    image: 'assets/images/team/3.jpg',
    name: 'John Shipmen',
    designation: 'Lead Developer'
 }]

}
