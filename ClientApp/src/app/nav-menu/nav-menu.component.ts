import { Component } from '@angular/core';
import { ClienteJson } from '../modelos/clienteJson';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  cliente: ClienteJson;
  logado: boolean;

  constructor(public servicioCliente: ClienteService, private router: Router)
  {
    this.servicioCliente.cliente.subscribe(res => {
      this.cliente = res;
      if (this.cliente == null || typeof this.cliente.email == "undefined")
        this.logado = false;
      else
        this.logado = true;
    })
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.servicioCliente.logout();
    this.router.navigate(['/login']);
    this.logado = false
  }
}
