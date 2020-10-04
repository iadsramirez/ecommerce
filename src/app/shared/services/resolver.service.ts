import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Product } from '../classes/product';
import { ProductService } from './product.service';
import { IProducto } from '../../modelo/IProducto';

@Injectable({
	providedIn: 'root'
})
export class Resolver implements Resolve<IProducto> {
  /*  
  public product: Product = {};

  constructor(
    private router: Router,
    public productService: ProductService
  ) {}

  // Resolver
  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    this.productService.getProductBySlug(route.params.slug).subscribe(product => {
      if(!product) { // When product is empty redirect 404
        console.log('datos parametros:'+route.params.slug);
          this.router.navigateByUrl('/pages/404', {skipLocationChange: true});
      } else {
          this.product = product
      }
    })

    return this.product;
  }*/


  public product: IProducto = {};
  public listaProd: IProducto[] = [];
  public listaTemp:IProducto[]=[];

  constructor(
    private router: Router,
    public productService: ProductService
  ) { }

  // Resolver
  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('parametro:'+route.params.slug);
    let parametro: number;
    parametro = parseInt(route.params.slug);
    this.productService.getProductosObjeto.subscribe(



      (data: IProducto[]) => {
        this.listaProd = data;
        this.listaTemp=[];
        this.listaProd.forEach(element => {
          if (element.productoPK.id === parametro) {
            console.log('INGRESO ASIG');
            this.listaTemp.push(element);
          } 
        })

          this.product=this.listaTemp[0];


      });

    /*    this.productService.getProductBySlug(route.params.slug).subscribe(product => {
        if (!product) { // When product is empty redirect 404
          console.log('datos parametros:' + route.params.slug);
          this.router.navigateByUrl('/pages/404', { skipLocationChange: true });
        } else {
          this.product = product
        }
      })*/

    return this.product;
  }





}
