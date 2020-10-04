export  module ProductoModelo {

    export interface AfiliadoPK {
        id: number;
        idCompania: number;
    }

    export interface Compania {
        direccion: string;
        id: number;
        idDepartamento: number;
        idMunicipio: number;
        idPais: number;
        nombre: string;
        path: string;
        raizUrl: string;
        razonSocial: string;
    }

    export interface Afiliado {
        afiliadoPK: AfiliadoPK;
        compania: Compania;
        contacto: string;
        correo: string;
        nombre: string;
        telefono: string;
    }

    export interface CategoriaProducto {
        codigoInterno: string;
        id: number;
        nombre: string;
    }

    export interface AfiliadoPK2 {
        id: number;
        idCompania: number;
    }

    export interface Compania2 {
        direccion: string;
        id: number;
        idDepartamento: number;
        idMunicipio: number;
        idPais: number;
        nombre: string;
        path: string;
        raizUrl: string;
        razonSocial: string;
    }

    export interface Afiliado2 {
        afiliadoPK: AfiliadoPK2;
        compania: Compania2;
        contacto: string;
        correo: string;
        nombre: string;
        telefono: string;
    }

    export interface ComercioPK {
        id: number;
        idAfiliado: number;
        idCompania: number;
    }

    export interface Categoria {
        id: number;
        nombre: string;
    }

    export interface SubCategoriaPK {
        id: number;
        idCategoria: number;
    }

    export interface SubCategoria {
        categoria: Categoria;
        nombre: string;
        subCategoriaPK: SubCategoriaPK;
    }

    export interface Comercio {
        acercaDe: string;
        afiliado: Afiliado2;
        comercioPK: ComercioPK;
        contacto: string;
        direccion: string;
        fechaIngreso: Date;
        nombre: string;
        subCategoria: SubCategoria;
        telefono: string;
        tiempoEspera: number;
    }

    export interface IdUnidad {
        abreviatura: string;
        id: number;
        nombre: string;
    }

    export interface MarcasPK {
        id: number;
        idCompania: number;
    }

    export interface Marcas {
        codigoInterno: string;
        marcasPK: MarcasPK;
        nombre: string;
    }

    export interface ProductoPK {
        id: number;
        idAfiliado: number;
        idCompania: number;
    }

    export interface CategoriaProducto2 {
        codigoInterno: string;
        id: number;
        nombre: string;
    }

    export interface SubcategoriaProductoPK {
        id: number;
        idCategoria: number;
    }

    export interface SubcategoriaProducto {
        categoriaProducto: CategoriaProducto2;
        codigoInterno: string;
        nombre: string;
        subcategoriaProductoPK: SubcategoriaProductoPK;
    }

    export interface RootObject {
        afiliado: Afiliado;
        categoriaProducto: CategoriaProducto;
        codigoInterno: string;
        comercio: Comercio;
        descripcion: string;
        estado: number;
        exento: string;
        idCategoriaProducto: number;
        idMarca: number;
        idSubcategoriaProducto: number;
        idUnidad: IdUnidad;
        marcas: Marcas;
        nombre: string;
        precio: number;
        productoPK: ProductoPK;
        referencia: string;
        subcategoriaProducto: SubcategoriaProducto;
    }

}

