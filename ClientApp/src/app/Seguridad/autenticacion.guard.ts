import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutenticacionGuard implements CanActivate
{

  constructor(private rutas: Router) { }

  public Libreria = "Libreria Pepito";

  canActivate(rutas: ActivatedRouteSnapshot)
  {
    this.rutas.navigate(['/login']);
    return false;

  }    
    
}
