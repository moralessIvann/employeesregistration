import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { ClienteJson } from '../modelos/clienteJson';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-cliente-component',
  templateUrl: './cliente.component.html'
})

export class ClienteComponent{

  altaForm: FormGroup;
  enviado: boolean = false;

  constructor(private servicioCliente: ClienteService, private formBuilder: FormBuilder)
  {
  }

  ngOnInit(): void /*pass value to form controls */ 
  {
    this.altaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get formulario(): { [key: string]: AbstractControl }
  {
    return this.altaForm.controls;
  }


  public AgregarCliente()
  {
    console.log("cliente component ts : AgregarCliente Pepito al presionar boton");
    this.enviado = true;
    if (this.altaForm.invalid) {
      console.log("invalido");
      return;
    }
    console.log("valido");
    //const cliente: Cliente = { nombre: 'Pepito', email: 'pepito@gmail.com', password: '21345' };
    //this.servicioCliente.agregarClientes(cliente).subscribe;

    let cliente: ClienteJson =
    {
      nombre: this.altaForm.controls['nombre'].value,
      email: this.altaForm.controls['email'].value,
      password: this.altaForm.controls['password'].value
    };
    this.servicioCliente.agregarClientes(cliente).subscribe();
  }

}
