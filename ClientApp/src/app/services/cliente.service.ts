import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from '../modelos/resultado';

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
}
