import { Afiliado } from './Afiliado';
import { CategoriaProducto } from './CategoriaProducto';
import { Comercio } from './Comercio';
import { IdUnidad } from './IdUnidad';
import { Marcas } from './Marcas';
import { ProductoPK } from './ProductoPK';
import { SubcategoriaProducto } from './SubcategoriaProducto';





export interface IProducto {
    afiliado?: Afiliado;
    categoriaProducto?: CategoriaProducto;
    codigoInterno?: string;
    comercio?: Comercio;
    descripcion?: string;
    estado?: number;
    exento?: string;
    idCategoriaProducto?: number;
    idMarca?: number;
    idSubcategoriaProducto?: number;
    idUnidad?: IdUnidad;
    marcas?: Marcas;
    nombre?: string;
    precio?: number;
    productoPK?: ProductoPK;
    referencia?: string;
    subcategoriaProducto?: SubcategoriaProducto;
    url?: string;
    url2?: string;
    cantidad?:number;
}