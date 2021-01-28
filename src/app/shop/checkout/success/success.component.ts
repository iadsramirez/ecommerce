import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order } from '../../../shared/classes/order';
import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit{

  public orderDetails : Order = {};

  constructor(public productService: ProductService,
    private orderService: OrderService) { }

  ngOnInit(): void {	
    this.orderDetails =JSON.parse(localStorage.getItem('checkoutItems'));

    console.log('Metodo normal'+JSON.parse(localStorage.getItem('checkoutItems')) );
  /*  this.orderService.checkoutItems.subscribe(response =>{
      this.orderDetails = response;
      console.log('Lo que viene de:'+JSON.stringify(response));
    } );

*/

  }

  ngAfterViewInit() {
    
  }

}
