import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
import { IProducto } from 'src/app/modelo/IProducto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: Product[] = [];
  public productoObj:IProducto[]=[];
  public totales:number=0;

  constructor(public productService: ProductService) {
    this.productService.cartItems.subscribe(response => this.products = response);

    this.productService.cartItemsIproducto.subscribe(response=>{this.productoObj=response
    //console.log('obteniendo datos cart'+this.productoObj.length);
    this.sumatoriaTotales(this.productoObj);
    });
  }

  ngOnInit(): void {
  }




  sumatoriaTotales(lista:IProducto[]){
    this.totales=0;
    lista.forEach(element => {
     // console.log('VALOR LISTA:'+JSON.stringify(element));

      this.totales +=element.cantidad*element.precio;
    });
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }


  public get getTotalIproducto(): Observable<number> {
    return this.productService.cartTotalCantidadSubTotal();
  }

  public get getTotalProd():Observable<number>{
    return this.productService.cartTotalAmount();
  }



  // Increament
  increment(product, qty = 1) {
    this.productService.updateCartQuantity(product, qty);
  }

 // Increament
 incrementIproducto(product, qty = 1) {
  this.productService.updateCartQuantityIproducto(product, qty);

  this.productService.cartItemsIproducto.subscribe(response=>{this.productoObj=response
    //console.log('obteniendo datos cart'+this.productoObj.length);
    this.sumatoriaTotales(this.productoObj);
    });


}




  // Decrement
  decrement(product, qty = -1) {
    this.productService.updateCartQuantity(product, qty);

    
  }


  decrementIProducto(product, qty = -1) {
    this.productService.updateCartQuantityIproducto(product, qty);

    this.productService.cartItemsIproducto.subscribe(response=>{this.productoObj=response
      //console.log('obteniendo datos cart'+this.productoObj.length);
      this.sumatoriaTotales(this.productoObj);
      });

      
  }


  public removeItem(product: any) {
    this.productService.removeCartItem(product);

    this.productService.cartItemsIproducto.subscribe(response=>{this.productoObj=response
      //console.log('obteniendo datos cart'+this.productoObj.length);
      this.sumatoriaTotales(this.productoObj);
      });
  }


  public removeItemIProducto(product: any) {
    this.productService.removeCartItemIProducto(product);

    this.productService.cartItemsIproducto.subscribe(response=>{this.productoObj=response
      //console.log('obteniendo datos cart'+this.productoObj.length);
      this.sumatoriaTotales(this.productoObj);
      });


  }


//


}
