import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadoJson } from '../modelos/resultadoJson';
import { Pedido } from '../modelos/pedido';
import { ClienteJson } from '../modelos/clienteJson';

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

  dameProductos(): Observable<ResultadoJson>
  {
    // return this.peticion.get<ResultadoJson>(this.url, { headers: reqHeader });
    return this.peticion.get<ResultadoJson>(this.url);
  }

  agregarPedido(pedido: Pedido): Observable<ResultadoJson> {
    return this.peticion.post<ResultadoJson>(this.url, pedido);
  }

  obtenerPedido(cliente: ClienteJson): Observable<ResultadoJson>
  {
    return this.peticion.post<ResultadoJson>(this.url + "Pedidos", cliente);
  }
}
