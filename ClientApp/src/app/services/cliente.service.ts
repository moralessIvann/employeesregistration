import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadoJson } from '../modelos/resultadoJson';
import { ClienteJson } from '../modelos/clienteJson';

@Injectable
  ({
    providedIn: 'root'
  })

export class ClienteService
{
  url: string = 'https://localhost:7182/api/clientes/';

  constructor(private peticion: HttpClient)
  {

  }

  obtenerClientes(): Observable<ResultadoJson>
  {
    console.log("obtenerClientes");
    return this.peticion.get<ResultadoJson>(this.url)
  }

  agregarClientes(cliente: ClienteJson): Observable<ResultadoJson>
  {
    console.log("cliente service: agregarClientes");
    return this.peticion.post<ResultadoJson>(this.url, cliente);

  }
}
