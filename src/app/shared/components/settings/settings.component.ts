import { Component, OnInit, Injectable, PLATFORM_ID, Inject, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers:[AuthService]
})
export class SettingsComponent implements OnInit {

  public products: Product[] = [];
  @Input() bandera:boolean;
  
  public languages = [{ 
    name: 'Español',
    code: 'es'
  }


];

  public currencies = [{
    name: 'SOLES',
    currency: '	S/',
    price: 0.90 // price of euro
  }]

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public productService: ProductService,public authService:AuthService) {


      console.log('VALOR QUE VIENE '+this.authService.flag);

      this.productService.cartItems.subscribe(response => this.products = response);

/*
      if(!this.bandera){
        this.products=[];
      }*/

  }

  ngOnInit(): void {
  }

  changeLanguage(code){
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }


  get getTotalIprod(): Observable<number> {
    return this.productService.cartTotalCantidad();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }

}
