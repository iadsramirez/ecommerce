import { CategoriaSubCategoria } from './CategoriaSubCategoria';
import { SubCategoria } from './SubCategoria';

export interface  Categoria{
    id:number;
    nombre:string;
    listaSubcategoria:CategoriaSubCategoria[];
    lista:SubCategoria[];

} 