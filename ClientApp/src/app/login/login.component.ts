import { Component, OnInit } from '@angular/core';
import { UsuarioApiService } from '../services/usuarioApi.service';
import { AuthenticationAPIJson } from '../modelos/authenticationAPIJson';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit
{

  usuarioAPI: AuthenticationAPIJson;

  constructor(private servicioLogin: UsuarioApiService)
  {
    console.log("constr")
    console.log("constr")
    // ServicioProducto.obtenerClientes().subscribe(res => { console.log(res)});
    this.usuarioAPI = {
      email: environment.usuarioAPI,
      password: environment.passwordAPI
    }
  }

  ngOnInit() {
    console.log("ngOnInit")
    this.servicioLogin.loginAPI(this.usuarioAPI).subscribe(respuesta => {
      console.log(respuesta)
    })
  }
}
