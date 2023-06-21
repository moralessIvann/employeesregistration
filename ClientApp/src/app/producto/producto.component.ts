import { Component, OnInit } from '@angular/core'
import { ProductoService } from '../services/producto.service'
import { UsuarioApiService } from '../services/usuarioApi.service';
import { AuthenticationAPIJson } from '../modelos/authenticationAPIJson';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-producto-component',
  templateUrl: './producto.component.html'
})

export class ProductoComponent implements OnInit {

  public listaProductos!: any[];
  usuarioAPI: AuthenticationAPIJson;

  constructor(private ServicioProducto: ProductoService, private servicioLogin: UsuarioApiService) {
    this.usuarioAPI = {
      email: environment.usuarioAPI,
      password: environment.passwordAPI 
    }
  }

  ngOnInit(): void {
    // this.consultarProductos()
    this.dameProductos();

    if (sessionStorage.getItem('token') == null) {
      this.servicioLogin.loginAPI(this.usuarioAPI).subscribe(respuesta => {
        if (respuesta.error != null && respuesta.error != '')
          console.log("Error al obtener token");
      })
    }
  }

  /*
  consultarProductos() {
    this.ServicioProducto.consultarProductos().subscribe(res => { console.log(res) });

    this.ServicioProducto.consultarProductos().subscribe(res => {
      this.listaProductos = res.objetoGenerico;
    });
  }
  */

  dameProductos() {
    this.ServicioProducto.dameProductos().subscribe(res => {
      this.listaProductos = res.objetoGenerico;
    });
  }

}
