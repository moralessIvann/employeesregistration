import { LineaPedido } from "./lineaPedido";

export interface Pedido {
  email: string;
  DetallesPedido?: LineaPedido[]
}
