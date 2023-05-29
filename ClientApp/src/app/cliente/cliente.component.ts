import { Component, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../modelos/cliente';

@Component({
  selector: 'app-cliente-component',
  templateUrl: './cliente.component.html'
})

export class ClienteComponent{

  @Input() nombre: string | undefined;
  @Input() email: string | undefined;

  nombreQueryString: string | undefined;
  emailQueryString: string | undefined;


  constructor(private route: ActivatedRoute, private servicioCliente: ClienteService)
  {
    this.route.queryParams.subscribe(params => {
      this.nombreQueryString = params['nombre'];
      this.emailQueryString = params['email'];
    });
  }

  public AgregarCliente()
  {
    const cliente: Cliente = { nombre: 'Pepito', email: 'pepito@gmail.com', password: '21345' };
    this.servicioCliente.agregarClientes(cliente).subscribe;
  }

}
