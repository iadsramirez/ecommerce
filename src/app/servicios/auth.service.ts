import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoriaSubCategoria } from '../modelo/CategoriaSubCategoria';
import { Categoria } from '../modelo/Categoria';
import { SubCategoria } from '../modelo/SubCategoria';




@Injectable()
export class AuthService {


  public user: User;
  public mensaje: string;
  baseurl:string=`http://207.180.199.154:8080/ecommerce/webresources/com.ecommerce.entidades.`;
  baseUrlComercio:string=`http://localhost:8080/ecommerce/webresources/com.ecommerce.entidades.comercio`;


  constructor(public afAuth: AngularFireAuth, private router: Router, private http: HttpClient) { }

  async login(email: string, password: string) {

    this.mensaje = '';

    try {


      const result = await this.afAuth.signInWithEmailAndPassword(email, password);

      this.router.navigate(['shop/collection/left/sidebar']);

      return result;



    } catch (error) {
      this.mensaje = 'Datos Incorrectos';
      this.router.navigate(['pages/login']);

      // console.log(error);

    }



  }

  async register(email: string, password: string) {
    this.mensaje = '';
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);

      this.router.navigate(['pages/login']);

      return result;

    } catch (error) {

      console.log(error);

    }

  }


  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }

  }





  getCurrentUser() {

    try {

      return this.afAuth.authState.pipe(first()).toPromise();
    } catch (error) {
      console.log('Error' + error);
    }



  }

  obtenerCategoria(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(`${this.baseurl}categoria`);


  }

//http://207.180.199.154:8080/ecommerce/webresources/com.ecommerce.entidades.subcategoria

  obtenerSubCategoria(): Observable<SubCategoria[]> {
    return this.http.get<SubCategoria[]>(`${this.baseurl}subcategoria`);

  }


  obtenerProveedor():Observable<any>{
    return  this.http.get(`http://207.180.199.154:8080/ecommerce/webresources/com.ecommerce.entidades.comercio`);
  }



}
