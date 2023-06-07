import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { AuthenticationAPIJson } from '../modelos/authenticationAPIJson';
import { Observable } from 'rxjs';
import { ResultadoJson } from '../modelos/resultadoJson';


@Injectable // creating an injectable srevice
  ({
    providedIn: 'root'
  })


export class UsuarioApiService
{
  // url: string = 'https://localhost:7182/api/clientes/';
  url: string = 'https://localhost:7182/api/UsuarioAPI/';

  constructor(private peticion: HttpClient)
  {

  }

  // devolvera token para futuras peticiones
  loginAPI(autenticacion: AuthenticationAPIJson): Observable <ResultadoJson>
  {
    return this.peticion.post<ResultadoJson>(this.url, autenticacion);
  }

}
