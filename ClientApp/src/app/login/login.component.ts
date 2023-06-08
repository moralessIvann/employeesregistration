import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UsuarioApiService } from '../services/usuarioApi.service';
import { AuthenticationAPIJson } from '../modelos/authenticationAPIJson';
import { environment } from '../../environments/environment';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioAPIJson } from '../modelos/usuarioAPIJson';
import { ClienteJson } from '../modelos/clienteJson';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  usuarioAPI: AuthenticationAPIJson;

  //form
  loginForm: FormGroup;
  enviado: boolean = false;
  resultadoPeticion: string;
  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any>;

  token: string;

  constructor(private servicioLogin: UsuarioApiService, private formBuilder: FormBuilder,
    private modalService: NgbModal, private servicioCliente: ClienteService, private router: Router) {

    // ServicioProducto.obtenerClientes().subscribe(res => { console.log(res)});
    this.usuarioAPI = {
      email: environment.usuarioAPI,
      password: environment.passwordAPI
    }
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required]
    })

    // servicio para llamar login API 
    this.servicioLogin.loginAPI(this.usuarioAPI).subscribe(respuesta => {
      if (respuesta.error != null && respuesta.error != '')
        this.resultadoPeticion = respuesta.texto;
      else
        this.token = (respuesta.objetoGenerico as UsuarioAPIJson).token;
      console.log(respuesta)
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  Login() {
    this.enviado = true;
    if (this.loginForm.invalid) {
      console.log("Invalido");
      return;
    }

    let cliente: ClienteJson =
    {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['pass'].value
    };

    this.servicioCliente.loginCliente(cliente, this.token).subscribe((respuesta => {
      if (respuesta.error != null && respuesta.error != '')
        this.resultadoPeticion = respuesta.texto;
      else
        this.resultadoPeticion = "Login correcto";

    });

    // Llamar método de Login incrustando el token en la cabecerea
    // this.resultadoPeticion = this.token;
    this.modalService.open(this.myModalInfo);
  }
}
