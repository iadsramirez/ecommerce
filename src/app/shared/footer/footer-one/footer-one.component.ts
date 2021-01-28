import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit {

  @Input() class: string = 'footer-light' // Default class 
  @Input() themeLogo: string = 'assets/images/logos/logoBodega.png' // Default Logo
  @Input() newsletter: boolean = true; // Default True

  public today: number = Date.now();

  comercio:any;

  constructor(private productoService:ProductService) {

    this.productoService.obtenerComercio().subscribe(
      comercios=>{
        this.comercio=comercios;
      }
    );

   }

  ngOnInit(): void {
  }

  

}
