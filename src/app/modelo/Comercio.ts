import { Afiliado } from './Afiliado';
import { ComercioPK} from './ComercioPK';
import {SubCategoria} from './SubCategoria';



export interface Comercio {
    acercaDe: string;
    afiliado: Afiliado;
    comercioPK: ComercioPK;
    contacto: string;
    direccion: string;
    fechaIngreso: Date;
    nombre: string;
    subCategoria: SubCategoria;
    telefono: string;
    tiempoEspera: number;
  }