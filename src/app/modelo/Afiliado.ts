import { AfiliadoPK } from './AfiliadoPK';
import { Compania } from './Compania';

export interface Afiliado {
    afiliadoPK: AfiliadoPK;
    compania: Compania;
    contacto: string;
    correo: string;
    nombre: string;
    telefono: string;
  }