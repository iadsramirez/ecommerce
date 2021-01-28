import { DetOrdenPK } from "./DetOrdenPK";
import { ProductoPK } from "./ProductoPKx";
import { Producto } from "./Producto";

export class DetOrden{
    detOrdenPK:DetOrdenPK;
    descripcion:string;
    observaciones:string;
    fecha:Date;
    precioU:number;
    cantidad:number;
    descuento:number;
    subtotal:number;
    comision:number;
    total:number;
    producto:Producto;

}