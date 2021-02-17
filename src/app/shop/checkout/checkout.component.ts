import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { IProducto } from 'src/app/modelo/IProducto';
import {Pedido} from 'src/app/modelo/Pedido';
import { Orden } from 'src/app/modelo/Orden';
import { Ubicaciones } from 'src/app/modelo/Ubicaciones';
import { Router } from '@angular/router';
import { DetOrden } from 'src/app/modelo/DetOrden';
import { Producto } from 'src/app/modelo/Producto';
import { ProductoPK } from 'src/app/modelo/ProductoPKx';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm:  FormGroup;
  public products: Product[] = [];
  public productoObj:IProducto[]=[];
  public payPalConfig ? : IPayPalConfig;
  public payment: string = 'Stripe';
  public amount:  any;

   listaDepartamentos:any;
   listaProvincia:any;
   listaDistrito:any;
   valorConsumo:number;
   consumo:number;


  constructor(private router: Router,private fb: FormBuilder,
    public productService: ProductService,
    private orderService: OrderService) { 
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      town: ['', ],
      state: ['',],
      postalcode: ['',],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  
   

  this.productService.obtenerConsumo().subscribe(
    
    
    valor=>{
      
      this.valorConsumo=valor[0].consumoMinimo;

      const consumirs = {} as Consumir;
      consumirs.valor=valor[0].consumoMinimo;
      localStorage.setItem('consumoComercio', JSON.stringify(consumirs));
      this.consumo=Number(consumirs.valor);
    }
  );


  console.log('valor del consumo de mierdAa'+this.consumo);
   
    this.productService.cartItems.subscribe(response => this.products = response);
    this.getTotal.subscribe(amount => this.amount = amount);
    this.productService.cartItemsIproducto.subscribe(response => this.productoObj = response);
    this.listaDepartamentos=[];
    this.productService.obtenerDepartamento().subscribe(
      depart=>{
      
        console.log('Vil'+JSON.stringify(depart));
        this.listaDepartamentos=depart;
      }
    );

    this.initConfig();




  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }



  public get getTotalIProducto(): Observable<number> {
    return this.productService.cartTotalCantidad();
  }

  public get totalNuevo():number{
    return this.productService.getCantida();
  }


  public get getSubTotalProducto():Observable<number>{
    return this.productService.cartTotalCantidadSubTotal();
  }



  llenarProvincia(param:any){
      this.productService.obtenerProvincia(param).subscribe(
            provincia=>{
              this.listaProvincia=provincia;
              
            }
      );
  }


  llenarDistrito(param:any){
    this.productService.obtenerDistrito(param).subscribe(
          provincia=>{
           
            this.listaDistrito=provincia;
          }
    );
}

llamadaApi(){
  localStorage.removeItem('cartItems');
  console.log('LO QUE VA PARA EL  API:'+JSON.stringify(this.productoObj));
  let pedido=new Pedido();
  pedido.orden=new Orden();
  pedido.detOrdenList=[];

  pedido.orden.subtotal=0;
  if(this.checkoutForm.get('distrito').value){
    console.log('pedido.orden.ubicGeog:'+this.checkoutForm.get('distrito').value);
    pedido.orden.ubicGeog=Number(this.checkoutForm.get('distrito').value); 
  }
   
  let subtotal=0;


  this.productoObj.forEach(data=>{
  let detalle=new DetOrden();  
  subtotal +=(data.precio*data.cantidad);

  detalle.cantidad=data.cantidad;
  detalle.precioU=data.precio;
  detalle.producto=new Producto();
  detalle.producto.productoPK=new ProductoPK();
  detalle.producto.productoPK.id=data.productoPK.id;
  detalle.producto.productoPK.idAfiliado=data.productoPK.idAfiliado;
  detalle.producto.productoPK.idCompania=data.productoPK.idCompania;
  detalle.subtotal=(data.precio*data.cantidad);
  detalle.total=detalle.subtotal+(detalle.subtotal*0.18);

  pedido.detOrdenList.push(detalle);
  });

  pedido.orden.subtotal=subtotal;
  pedido.orden.observaciones='Orden';

  console.log('objeto que mando al api:'+JSON.stringify(pedido));
  this.productService.guardarPedido(pedido).subscribe(
    guardado=>{
      console.log('Objeto Guardado'+JSON.stringify(guardado));
    }
  );

  
var item = {
    shippingDetails: this.checkoutForm.value,
    product: this.products,
    orderId: 1,
    totalAmount: subtotal,
    totalCompra:this.totalNuevo
};

localStorage.setItem("checkoutItems", JSON.stringify(item));
  this.router.navigate(['/shop/checkout/success', 1]);
  //this.orderService.probarPedido(this.products, this.checkoutForm.value, 1, this.amount);
}


      
  // Stripe Payment Gateway esta se llama originalmente
  stripeCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripe_token, // publishble key
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
      }
    });
    handler.open({
      name: 'Pedido',
      description: 'Confirmado Con Exito!!',
      amount: this.amount * 100
    }) 
  }

  // Paypal Payment Gateway
  private initConfig(): void {
    this.payPalConfig = {
        currency: this.productService.Currency.currency,
        clientId: environment.paypal_token,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                currency_code: this.productService.Currency.currency,
                value: this.amount,
                breakdown: {
                    item_total: {
                        currency_code: this.productService.Currency.currency,
                        value: this.amount
                    }
                }
              }
          }]
      },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            size:  'small', // small | medium | large | responsive
            shape: 'rect', // pill | rect
        },
        onApprove: (data, actions) => {
            this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
  }

}



 interface Consumir{
valor:number;
};