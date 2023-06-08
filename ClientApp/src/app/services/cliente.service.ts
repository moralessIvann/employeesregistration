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
    return this.peticion.get<ResultadoJson>(this.url)
  }

  agregarClientes(cliente: ClienteJson): Observable<ResultadoJson>
  {
    return this.peticion.post<ResultadoJson>(this.url, cliente);
  }

  editarClientes(cliente: ClienteJson): Observable<ResultadoJson>
  {
    return this.peticion.put<ResultadoJson>(this.url, cliente);
  }

  borrarClientes(email: string): Observable<ResultadoJson> {
    return this.peticion.delete<ResultadoJson>(this.url + email);
  }

  loginCliente(cliente: ClienteJson, token: string): Observable<ResultadoJson>
  {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + token
    });

    return this.peticion.post<ResultadoJson>(this.url + "Login", cliente, { headers: reqHeader });
  }

}
