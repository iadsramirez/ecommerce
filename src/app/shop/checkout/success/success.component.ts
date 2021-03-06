import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order } from '../../../shared/classes/order';
import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/product.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
  providers:[AuthService]
})
export class SuccessComponent implements OnInit, AfterViewInit{

  public orderDetails : Order = {};
  total:number=0;
  consumo:number=0;
  impuesto:number=0;
  today = Date.now();
  limpiar:boolean=true;
  
   actualizo:boolean=false;


  constructor(public productService: ProductService,
    private orderService: OrderService,private router: Router,public authService:AuthService) { 
      this.authService.flag=true;
      this.limpiar=true;
      
     
      if (!localStorage.getItem('foo')) { 
        localStorage.setItem('foo', 'no reload') 
        location.reload() 
      } else {
        localStorage.removeItem('foo') 
      }
      
    }

    

  ngOnInit(): void {	
    localStorage.removeItem('cartItems');
    
    console.log('this.orderDetails.totalAmount:'+JSON.stringify(this.orderDetails.totalAmount));
    this.orderDetails =JSON.parse(localStorage.getItem('checkoutItems'));
    this.impuesto=Number(this.orderDetails.totalAmount)*0.19;
    this.consumo=Number(JSON.parse(localStorage.getItem('consumoComercio')))+this.impuesto;
    this.impuesto=Number(this.orderDetails.totalAmount)*0.19;
    this.total=Number(this.orderDetails.totalAmount)+this.consumo;
    
    //console.log('Metodo normal'+JSON.parse(localStorage.getItem('checkoutItems')) );
  /*  this.orderService.checkoutItems.subscribe(response =>{
      this.orderDetails = response;
      console.log('Lo que viene de:'+JSON.stringify(response));
    } );

*/

  }


  refresh(){
   this.router.navigate(['/shop/checkout/success/1']);
   this.ngOnInit(); 
   
   location.reload();
  }


  ngAfterViewInit() {
    
  }

  navegar(){
   
    localStorage.setItem('cartItems', '');
    this.router.navigateByUrl('/shop/');

  }


  public get costoEnvio():number {
    return this.productService.obtenerCostoEnvio();
  }



   multiplica(valor1:number, valor2:number): number {
    return valor1*valor2;
  }


restaImpuesto(total:number,impuesto:number){
  return total-impuesto;
}




plusSubtotal(total:number,impuesto:number){
  return total+impuesto;
}

}
