import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order } from '../../../shared/classes/order';
import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/product.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit{

  public orderDetails : Order = {};
  total:number=0;
  consumo:number=0;

  constructor(public productService: ProductService,
    private orderService: OrderService,private router: Router) { }

  ngOnInit(): void {	
    localStorage.removeItem('cartItems');
    
    console.log('this.orderDetails.totalAmount:'+JSON.stringify(this.orderDetails.totalAmount));
    this.orderDetails =JSON.parse(localStorage.getItem('checkoutItems'));
    this.consumo=JSON.parse(localStorage.getItem('consumoComercio'));
    this.total=Number(this.orderDetails.totalAmount)+this.consumo;
    //console.log('Metodo normal'+JSON.parse(localStorage.getItem('checkoutItems')) );
  /*  this.orderService.checkoutItems.subscribe(response =>{
      this.orderDetails = response;
      console.log('Lo que viene de:'+JSON.stringify(response));
    } );

*/

  }

  ngAfterViewInit() {
    
  }

  navegar(){
    
    this.router.navigateByUrl('/');
  }


  public get costoEnvio():number {
    return this.productService.obtenerCostoEnvio();
  }

}
