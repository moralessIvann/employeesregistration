import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-component',
  templateUrl: './cliente.component.html'
})

export class ClienteComponent{

  constructor(private router: Router) {
  }

  public AgregarCliente() {
    this.router.navigate(['/cliente'])
  }

}
