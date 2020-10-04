import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    AuthService
  ]
})
export class LoginComponent implements OnInit {

  public msj: string;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
    password: new FormControl('')

  });


  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  async onLogin() {

    const { email, password } = this.loginForm.value;

    this.authSvc.login(email, password);

    this.msj = this.authSvc.mensaje;

  }

}
