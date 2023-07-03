import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UsuarioApiService } from '../services/usuarioApi.service';
import { AuthenticationAPIJson } from '../modelos/authenticationAPIJson';
import { environment } from '../../environments/environment';
import { ClienteJson } from '../modelos/clienteJson';
import { ProductoService } from '../services/producto.service';
import { PedidoDetalle } from '../modelos/pedidoDetalle';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historicopedidos-component',
  templateUrl: './historicopedidos.component.html'
})

export class HistoricoPedidosComponent implements OnInit
{
  usuarioAPI: AuthenticationAPIJson;
  cliente: ClienteJson;
  listaPedidos: PedidoDetalle[];
  detalleAux: number = 0;
  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any>;

  constructor(private servicioLogin: UsuarioApiService, private servicioProducto: ProductoService,
    private modalService: NgbModal  ) {
    this.usuarioAPI =
    {
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
          this.damePedidos();
      })
    }
    else { this.damePedidos(); }
  }

  damePedidos(): void
  {
    let usuarioSesion = JSON.parse(localStorage.getItem('emailLogin') || '{}');
    this.cliente = { email: usuarioSesion.email };
    this.servicioProducto.obtenerPedido(this.cliente).subscribe(res =>
    {
      if (res.error != null && res.error != '') {
        // console.log("Error al obtener pedidos");
      }
      else
      {
        this.listaPedidos = res.objetoGenerico;
      }
    })
  }

  detalles(indice: number) {
    this.detalleAux = indice;
    this.modalService.open(this.myModalInfo);
    console.log(this.listaPedidos[this.detalleAux].detallesProductosPedido);
  }
}


