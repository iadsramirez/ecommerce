import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeSlider, ProductSlider } from '../../shared/data/slider';
import { Product } from '../../shared/classes/product';
import { ProductService } from '../../shared/services/product.service';
import {CategoriaProd} from '../../modelo/CategoriaProd';
import { SettingsComponent } from 'src/app/shared/components/settings/settings.component';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit, OnDestroy {

  public themeLogo: string = 'assets/images/icon/logo-5.png';

  nombreComercio:any;
  nombreComercioOriginal:any;
  //logoUrl = "http://207.180.199.154:8080/ecommerce/img/ARALSOFT/Promocion/TECNOLOGIA";

  public products: Product[] = [];
  public productCollections: any[] = [];
  listaCategoriaTemp:Array<any>=[];
  public listaCategoria:Array<any>=[];
  listaImagenBanner:Array<any>;
  lista:any=[];
  limpiar:boolean;

  
  //@ViewChild(SettingsComponent) hijo: SettingsComponent;


  constructor(private _sanitizer:DomSanitizer,
    public productService: ProductService) {

      this.limpiar=true;

     // window.location.reload(true);

     localStorage.setItem('cartItems', '');
      
      this.productService.obtenerImagenBanner().subscribe(
        imagenes=>{
          //console.log('Imagenes'+JSON.stringify(imagenes));
          this.listaImagenBanner=imagenes;
          this.listaImagenBanner.forEach(element => {
         //   console.log('la mierda que..:'+element.url);
            this.lista.push('http://'+element.url);
           
           // console.log('Imagenes de mierda'+JSON.stringify(this.lista));
          });
        }
      );
    
      localStorage.setItem('cartItems', '');

     this.productService.obtenerCategorias().subscribe(
       catego=>{
         this.listaCategoriaTemp=catego;
         this.listaCategoriaTemp.forEach(elemento=>{
           //console.log('OBJETO CATEGORIAS'+JSON.stringify(elemento));
           let categoriProd=new CategoriaProd();
          // console.log('direccion de la imagen:'+JSON.stringify(elemento));
           if(elemento.path){
            categoriProd.image=String(elemento.path).replace(".png","").replace(".jpg","").replace(".jpeg","");
           }
           
           categoriProd.title=elemento.nombre;
           categoriProd.codigoCategoria=elemento.codigoInterno;
           this.listaCategoria.push(categoriProd);
         });
       }
     ); 


    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'tools');
      // Get Product Collection
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });


    this.nombreComercioOriginal='Mi Bodeguita';



    if(localStorage.getItem('comercio')){
      //const myData = JSON.parse(localStorage.getItem('comercio'));

     this.nombreComercio= JSON.parse(localStorage.getItem('comercio'));   
      this.nombreComercioOriginal=this.nombreComercio;
    }

/*
    this.nombreComercio= JSON.parse(localStorage.getItem('comercio'));
    console.log('nombreComercio'+this.nombreComercio);

    if(this.nombreComercio){
      console.log('INGRESO EN LA MIERDA 1');
      this.nombreComercioOriginal=this.nombreComercio;
    }else{
      console.log('INGRESO EN AMABAS MIERDAS');
      this.nombreComercioOriginal='Mi Bodeguita';
    }*/




  }

  public HomeSliderConfig: any = HomeSlider;
  public ProductSliderConfig: any = ProductSlider;

  // services
  public categories = [{
    image: 'assets/images/categories/14.jpg',
    title: 'Comida',
    text:  this._sanitizer.bypassSecurityTrustHtml('<li><a href="#">Carnes Importadas</a></li><li><a href="#">Verduras Frescas</a></li><li><a href="#">Semillas Importadas</a></li><li><a href="#">Comida Baja en Grasa</a></li>'),
  }, {
    image: 'assets/images/categories/15.jpg',
    title: 'Vinos y mas',
    text:  this._sanitizer.bypassSecurityTrustHtml('<li><a href="#">Vinos Importados</a></li><li><a href="#">Wishky</a></li><li><a href="#">Vodka</a></li><li><a href="#">Tequila Importada</a></li>'),
  }, {
    image: 'assets/images/categories/16.jpg',
    title: 'Ropa Importada',
    text:  this._sanitizer.bypassSecurityTrustHtml('<li><a href="#">Ropa Dama</a></li><li><a href="#">Ropa Caballero</a></li><li><a href="#">Ropa para Niño</a></li><li><a href="#">Ropa para Niña</a></li>'),
  }, {
    image: 'assets/images/categories/17.jpg',
    title: 'Hogar',
    text:  this._sanitizer.bypassSecurityTrustHtml('<li><a href="#">Refrigeradores</a></li><li><a href="#">TV Smart</a></li><li><a href="#">Equipo de Sonido</a></li><li><a href="#">Cocinas/Micro Ondas</a></li>'),
  }, {
    image: 'assets/images/categories/18.jpg',
    title: 'Tecnologia',
    text:  this._sanitizer.bypassSecurityTrustHtml('<li><a href="#">Smart Phones</a></li><li><a href="#">Computadoras</a></li><li><a href="#">Tablet</a></li><li><a href="#">Iphones</a></li>'),
  }]

  // Logo
  public logos = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',        
  }];

  ngOnInit(): void {
    // Add class in body
    document.body.classList.add("tools-bg");
    localStorage.setItem('cartItems', '');
  }

  ngOnDestroy(): void {
    // Remove class in body
    document.body.classList.remove("tools-bg");
   // localStorage.setItem('cartItems', '');
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }









  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}



photoURL(imageUrl) {
  console.log('imageUrl:'+imageUrl)
  return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
}

}
