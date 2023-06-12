import { Component, OnInit } from '@angular/core'
import { ProductoService } from '../services/producto.service'
import { UsuarioApiService } from '../services/usuarioApi.service';

@Component({
  selector: 'app-producto-component',
  templateUrl: './producto.component.html'
})

export class ProductoComponent implements OnInit {

  public listaProductos!: any[];

  constructor(private ServicioProducto: ProductoService, private servicioLogin: UsuarioApiService) {
  }

  ngOnInit(): void {
    // this.consultarProductos()
    this.dameProductos();
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
    this.ServicioProducto.dameProductos(this.servicioLogin.tokenAPI).subscribe(res => {
      this.listaProductos = res.objetoGenerico;
    });
  }

}
