import { Categoria} from './Categoria';
import { SubCategoriaPK } from './SubCategoriaPK';


export interface SubCategoria {
    categoria: Categoria;
    nombre: string;
    subCategoriaPK: SubCategoriaPK;
  }