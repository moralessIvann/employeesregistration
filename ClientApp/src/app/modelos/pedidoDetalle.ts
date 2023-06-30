import { PedidoDetalleProducto } from "./pedidoDetalleProducto";

export interface PedidoDetalle {
  total: number;
  detallesProductosPedido: PedidoDetalleProducto[]
}
