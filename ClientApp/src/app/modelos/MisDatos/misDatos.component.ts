import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UsuarioApiService } from '../../services/usuarioApi.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { environment } from '../../../environments/environment';
import { ClienteJson } from '../clienteJson';
import { AuthenticationAPIJson } from '../authenticationAPIJson';

@Component({
  selector: 'app-misDatos-component',
  templateUrl: './misDatos.component.html'
})


export class MisDatosComponent implements OnInit {

  usuarioAPI: AuthenticationAPIJson;
  datosForm: FormGroup;
  resultadoPeticion: string;
  enviado = false;
  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any> | undefined;

  constructor(private servicioLogin: UsuarioApiService, private formBuilder: FormBuilder,
    private servicioCliente: ClienteService, private modalService: NgbModal) {
    this.usuarioAPI =
    {
      email: environment.usuarioAPI,
      password: environment.passwordAPI
    }
  }

  ngOnInit() {

    this.datosForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      pass: ['', Validators.required]

    })

    //Login API
    if (sessionStorage.getItem('token') == null) {
      this.servicioLogin.loginAPI(this.usuarioAPI).subscribe(res => {
        if (res.error != null && res.error != '') {
          this.resultadoPeticion = res.texto;
          console.log(res.error);
          this.modalService.open(this.myModalInfo);
        }
      })
    }

    let usuarioSesion = JSON.parse(localStorage.getItem('emailLogin') || '{}');
    let cliente: ClienteJson = { email: usuarioSesion.email };
    this.servicioCliente.dameCliente(cliente).subscribe(res => {
      if (res.error != null && res.error != '') {
        this.resultadoPeticion = res.texto;
        console.log(res.error);
        this.modalService.open(this.myModalInfo);
      }
      else {
        const c = res.objetoGenerico as ClienteJson;
        this.datosForm.controls['nombre'].setValue(c.nombre);
      }

    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.datosForm.controls;
  }

  MisDatos() {
    this.enviado = true;

    if (this.datosForm.invalid) {
      return;
    }

    let usuarioSesion = JSON.parse(localStorage.getItem('emailLogin') || '{}');
    let aux: ClienteJson = { email: usuarioSesion.email };

    let cliente: ClienteJson =
    {
      nombre: this.datosForm.controls['nombre'].value,
      email: aux.email,
      password: this.datosForm.controls['pass'].value
    };

    this.servicioCliente.editarClientes(cliente).subscribe(res => {
      if (res.error != null && res.error != '') {
        this.resultadoPeticion = res.texto;
        console.log(res.error);
        this.modalService.open(this.myModalInfo);
      }
      else {
        this.resultadoPeticion = 'Datos modificados correctamente';
      }
      this.modalService.open(this.myModalInfo);
    })
  }
}

