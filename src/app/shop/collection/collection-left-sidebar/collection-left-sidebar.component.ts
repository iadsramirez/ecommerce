import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from "../../../shared/services/product.service";
import { Product } from '../../../shared/classes/product';
import { IProducto } from 'src/app/modelo/IProducto';
import { CategoriaProd } from 'src/app/modelo/CategoriaProd';
import { CollectionSlider } from 'src/app/shared/data/slider';

@Component({
  selector: 'app-collection-left-sidebar',
  templateUrl: './collection-left-sidebar.component.html',
  styleUrls: ['./collection-left-sidebar.component.scss']
})
export class CollectionLeftSidebarComponent implements OnInit {

  public listaCategoria:Array<any>=[];
  listaCategoriaTemp:Array<any>=[];

  public CollectionSliderConfig: any = CollectionSlider;
  public grid: string = 'col-xl-3 col-md-6';
  public layoutView: string = 'grid-view';
  public products: Product[] = [];
  public productosObjeto: IProducto[] = [];
  public brands: any[] = [];
  public colors: any[] = [];
  public size: any[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 1200;
  public tags: any[] = [];
  public category: string;
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router,
    private viewScroller: ViewportScroller, public productService: ProductService) {


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


      this.productService.getProductosObjeto.subscribe(

        (response:IProducto[]) => {
          this.productosObjeto = response;
          //console.log('OM');
          //console.log(response);
        }
      );


    // Get Query params..
    this.route.queryParams.subscribe(params => {

     // console.log('Params'+JSON.stringify(params));

      this.brands = params.brand ? params.brand.split(",") : [];
      this.colors = params.color ? params.color.split(",") : [];
      this.size = params.size ? params.size.split(",") : [];
      this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
      this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
      this.tags = [...this.brands, ...this.colors, ...this.size]; // All Tags Array

      this.category = params.category ? params.category : null;
    //  console.log('el valor de la mierda de categoria:'+this.category);
      this.sortBy = params.sortBy ? params.sortBy : 'ascending';
      this.pageNo = params.page ? params.page : this.pageNo;

      // Get Filtered Products..
      this.productService.filterProducts(this.tags).subscribe(response => {

        // Sorting Filter
        this.products = this.productService.sortProducts(response, this.sortBy);


        // Category Filter
        if (params.category){
          this.products = this.products.filter(item => item.type == this.category);
        //  console.log('hago parametro categoria');      
          this.productService.getProductosObjeto.subscribe(
            
            (response:IProducto[]) => {
              this.productosObjeto = response;
              this.productosObjeto=this.productosObjeto.filter(item=>item.categoriaProducto.codigoInterno==this.category);
            }
          );
        }
          

        // Price Filter
        this.products = this.products.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice)

        // Paginate Products
        this.paginate = this.productService.getPager(this.products.length, +this.pageNo);     // get paginate object from service
        this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
      })





    })

    /////////////////////////obtener lista productos/////////////////////////


    





    



    ////////////////////////////////////////////////////////////////////////




  }

  ngOnInit(): void {
  }


  // Append filter value to Url
  updateFilter(tags: any) {
    tags.page = null; // Reset Pagination
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: tags,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // SortBy Filter
  sortByFilter(value) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Remove Tag
  removeTag(tag) {

    this.brands = this.brands.filter(val => val !== tag);
    this.colors = this.colors.filter(val => val !== tag);
    this.size = this.size.filter(val => val !== tag);

    let params = {
      brand: this.brands.length ? this.brands.join(",") : null,
      color: this.colors.length ? this.colors.join(",") : null,
      size: this.size.length ? this.size.join(",") : null
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Clear Tags
  removeAllTags() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // product Pagination
  setPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if (value == 'list-view')
      this.grid = 'col-lg-12';
    else
      this.grid = 'col-xl-3 col-md-6';
  }

  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

}
