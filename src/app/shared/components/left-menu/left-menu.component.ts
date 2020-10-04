import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { CategoriaSubCategoria } from '../../../modelo/CategoriaSubCategoria';
import { CategoriaProducto } from '../../../modelo/CategoriaProducto';
import { SubCategoria } from '../../../modelo/SubCategoria';
import { Categoria } from 'src/app/modelo/Categoria';


@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  public menuItems: Menu[];

  public menuNuevo: Categoria[] = [];

  public submenuNuevo: SubCategoria[] = [];


  public submenuNuevoFilter: SubCategoria[] = [];


  constructor(private router: Router, public navServices: NavService, public servicioMenu: AuthService) {
    this.navServices.leftMenuItems.subscribe(menuItems => this.menuItems = menuItems);
    this.router.events.subscribe((event) => {
      this.navServices.mainMenuToggle = false;
    });




  }

  ngOnInit(): void {


    this.servicioMenu.obtenerSubCategoria().subscribe(
      (datos: SubCategoria[]) => {
        this.submenuNuevo = datos;
      }
    );

    let listaCategoriaTemp: Categoria[] = [];

    this.servicioMenu.obtenerCategoria().subscribe(

      (data: Categoria[]) => {




        listaCategoriaTemp = data;


        listaCategoriaTemp.forEach((element) => {
          element.lista = [];

          this.submenuNuevo.forEach((sub) => {
            if (element.id === sub.categoria.id) {


              element.lista.push(sub);
            }
          });



        });

        this.menuNuevo = listaCategoriaTemp;


      }
    );



  }

 
  leftMenuToggle(): void {
    this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }

}
