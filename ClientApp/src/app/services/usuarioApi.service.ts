import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { AuthenticationAPIJson } from '../modelos/authenticationAPIJson';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResultadoJson } from '../modelos/resultadoJson';
import { UsuarioAPIJson } from '../modelos/usuarioAPIJson';
import { map } from 'rxjs/operators';

@Injectable // creating an injectable srevice
  ({
    providedIn: 'root'
  })


export class UsuarioApiService
{
  url: string = 'https://localhost:7182/api/UsuarioAPI/';

  private tokenAPISubject: BehaviorSubject<string>;

  public get tokenAPI(): string
  {
    return this.tokenAPISubject.value;
  }

  constructor(private peticion: HttpClient)
  {
    this.tokenAPISubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token') || '{}'));
  }

  // devolvera token para futuras peticiones
  loginAPI(autenticacion: AuthenticationAPIJson): Observable <ResultadoJson>
  {
    return this.peticion.post<ResultadoJson>(this.url, autenticacion).pipe(
      map(result => {
        if (result.error == null || result.error == '') {
          const token: string = (result.objetoGenerico as UsuarioAPIJson).token;
          localStorage.setItem('token', JSON.stringify(token));
          this.tokenAPISubject.next(token);
          console.log("loginAPI method");
        }
        return result;
      })
    );
  }

}
