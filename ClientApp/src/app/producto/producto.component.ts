import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { ProductoService } from '../services/producto.service'
import { UsuarioApiService } from '../services/usuarioApi.service';
import { AuthenticationAPIJson } from '../modelos/authenticationAPIJson';
import { environment } from '../../environments/environment';
import { Pedido } from '../modelos/pedido';
import { LineaPedido } from '../modelos/lineaPedido';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-producto-component',
  templateUrl: './producto.component.html'
})

export class ProductoComponent implements OnInit {

  public listaProductos!: any[];
  usuarioAPI: AuthenticationAPIJson;
  pedido: Pedido;
  lineasPedido: LineaPedido[];
  public TotalPedido: number = 0;
  public resultadoPedido: string = '';
  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any>;

  constructor(private ServicioProducto: ProductoService, private servicioLogin: UsuarioApiService,
    private modalService: NgbModal  ) {
    this.usuarioAPI = {
      email: environment.usuarioAPI,
      password: environment.passwordAPI 
    }
  }

  ngOnInit(): void {

    if (sessionStorage.getItem('token') == null) {
      this.servicioLogin.loginAPI(this.usuarioAPI).subscribe(respuesta => {
        if (respuesta.error != null && respuesta.error != '')
          console.log("Error al obtener token");
        else
          this.dameProductos();
      })
    }
    else
    {
      this.dameProductos();
    }      
  }

  dameProductos() {
    this.ServicioProducto.dameProductos().subscribe(res => {
      this.listaProductos = res.objetoGenerico;
    });
  }

  agregarProducto(indice: number) {
    let usuarioSesion = JSON.parse(localStorage.getItem('emailLogin') || '{}');
    let cant = (<HTMLInputElement>document.getElementById("txtCantidad_" + indice)).value;

    if (typeof this.pedido == "undefined") {
      this.lineasPedido = [];
      let lineaPedido: LineaPedido;
      lineaPedido = { IdProducto: this.listaProductos[indice].id, Cantidad: Number(cant), ImporteUnitario: this.listaProductos[indice].precio }
      this.lineasPedido.push(lineaPedido);
      this.calcularTotal();
    }
    else {
      // controlar elementos repetidos
      this.lineasPedido = this.lineasPedido.filter(x => x.IdProducto !== this.listaProductos[indice].id)
      let lineaPedido: LineaPedido;
      lineaPedido = { IdProducto: this.listaProductos[indice].id, Cantidad: Number(cant), ImporteUnitario: this.listaProductos[indice].precio }
      this.lineasPedido.push(lineaPedido);
      this.calcularTotal();
    }
    this.pedido = { email: usuarioSesion.email, DetallesPedido: this.lineasPedido };
    // console.log(this.pedido);
  }

  calcularTotal() {
    this.TotalPedido = 0;
    for (let l of this.lineasPedido)
      this.TotalPedido = this.TotalPedido + (l.Cantidad * l.ImporteUnitario);

    this.TotalPedido = Number(this.TotalPedido.toFixed(2));
  }

  finalizarPedido() {
    this.ServicioProducto.agregarPedido(this.pedido).subscribe(res => {
      if (res.error != null && res.error != '') {
        this.resultadoPedido = res.texto;
      }
      else {
        this.resultadoPedido = 'Pedido realizado correctamente';
      }
      this.modalService.open(this.myModalInfo);
      this.TotalPedido = 0;
    })
  }
}
