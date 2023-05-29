import { Component, OnInit } from '@angular/core'
import { ProductoService } from '../services/producto.service'

@Component({
  selector: 'app-producto-component',
  templateUrl: './producto.component.html'
})

export class ProductoComponent implements OnInit {

  public listaProductos!: any[];

  constructor(private ServicioProducto: ProductoService) {
  }

  ngOnInit(): void {
    this.consultarProductos()
  }

  consultarProductos() {
    this.ServicioProducto.consultarProductos().subscribe(res => { console.log(res) });

    this.ServicioProducto.consultarProductos().subscribe(res => {
      this.listaProductos = res.objetoGenerico;
    });
  }

}
