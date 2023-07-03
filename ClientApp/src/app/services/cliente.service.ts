import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResultadoJson } from '../modelos/resultadoJson';
import { ClienteJson } from '../modelos/clienteJson';
import { map } from 'rxjs/operators';

@Injectable
  ({
    providedIn: 'root'
  })

export class ClienteService
{
  url: string = 'https://localhost:7182/api/clientes/';

  private emailLoginSubject: BehaviorSubject<ClienteJson>

  public cliente: Observable<ClienteJson>;

  public get usuarioLogin(): ClienteJson {
    return this.emailLoginSubject.value;
  }

  constructor(private peticion: HttpClient)
  {
    this.emailLoginSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('emailLogin') || '{}'));
    this.cliente = this.emailLoginSubject.asObservable();
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

  loginCliente(cliente: ClienteJson): Observable<ResultadoJson>
  {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    });

    return this.peticion.post<ResultadoJson>(this.url + "Login", cliente).pipe
      (
      map(result => {
        if (result.error == null || result.error == '') {
          const cliente: ClienteJson = (result.objetoGenerico as ClienteJson);
          localStorage.setItem('emailLogin', JSON.stringify(cliente));
          this.emailLoginSubject.next(cliente);
        }
        return result;
      })
    );
  }

  logout() {
    sessionStorage.removeItem('emailLogin');
    sessionStorage.removeItem('token');
    this.emailLoginSubject.next(null!);
  }

  dameCliente(cliente: ClienteJson): Observable<ResultadoJson> {
    return this.peticion.post<ResultadoJson>(this.url + "Cliente", cliente);
  }

}
