import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from '../modelos/resultadoJson';

@Injectable
  ({
    providedIn: 'root'
  })

export class ProductoService
{
  url: string = 'https://localhost:7182/api/productos/';

  constructor(private peticion: HttpClient)
  {

  }

  consultarProductos(): Observable<Resultado>
  {
    return this.peticion.get<Resultado>(this.url);
  }
}
