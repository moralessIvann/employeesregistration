import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from '../modelos/resultadoJson';
import { Cliente } from '../modelos/cliente';

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

  obtenerClientes(): Observable<Resultado>
  {
    return this.peticion.get<Resultado>(this.url)
  }

  agregarClientes(cliente: Cliente): Observable<Resultado>
  {
    return this.peticion.post<Resultado>(this.url, cliente);

  }
}
