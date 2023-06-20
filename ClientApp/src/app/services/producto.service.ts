import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadoJson } from '../modelos/resultadoJson';

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

  /*
  consultarProductos(): Observable<ResultadoJson>
  {
    return this.peticion.get<ResultadoJson>(this.url);
  }
  */

  dameProductos(token: string): Observable<ResultadoJson>
  {
    /*
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    */

    // return this.peticion.get<ResultadoJson>(this.url, { headers: reqHeader });
    return this.peticion.get<ResultadoJson>(this.url);
  }
}
