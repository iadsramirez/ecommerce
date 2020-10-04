import { CategoriaProducto } from './CategoriaProducto';
import { SubcategoriaProductoPK } from './SubcategoriaProductoPK';


export interface SubcategoriaProducto {
    categoriaProducto: CategoriaProducto;
    codigoInterno: string;
    nombre: string;
    subcategoriaProductoPK: SubcategoriaProductoPK;
  }