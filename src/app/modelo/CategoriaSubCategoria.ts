import { Categoria } from './Categoria';
import { SubCategoriaPK } from './SubCategoriaPK';
import { SubCategoria } from './SubCategoria';


export interface CategoriaSubCategoria {
    categoria: Categoria;
    nombre: string;
    subCategoriaPK: SubCategoriaPK;
    listaSub:SubCategoria[];

}

