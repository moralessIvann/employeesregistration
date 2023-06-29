using Microsoft.EntityFrameworkCore.Storage;
using net_angular.Models;
using net_angular.Models.ViewModels;

namespace net_angular.Servicios;

public class ProductoServicio : IProductos
{
    public List<Producto> DameProductos()
    {
        List<Producto> lista;

        using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
        {
            lista = basedatos.Productos.ToList();
        }

        return lista;
    }

    public void AgregarPedido(PedidoViewModel p)
    {
        IDbContextTransaction transaccion = null;

        try
        {
            using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
            {
                transaccion = basedatos.Database.BeginTransaction();
                {
                    var pedido = new Pedido();
                    pedido.Total = p.DetallesPedido.Sum(p => p.Cantidad * p.ImporteUnitario);
                    var cliente = basedatos.Clientes.Single(cli => cli.Email == p.email);
                    pedido.IdCliente = cliente.Id;
                    pedido.FechaPedido = DateTime.Now;
                    basedatos.Pedidos.Add(pedido);
                    basedatos.SaveChanges();

                    foreach (var d in p.DetallesPedido)
                    {
                        var detalle = new LineasPedido();
                        detalle.Cantidad = d.Cantidad;
                        detalle.ImporteUnitario = d.ImporteUnitario;
                        detalle.IdProducto = d.IdProducto;
                        detalle.IdPedido = pedido.Id;
                        basedatos.LineasPedidos.Add(detalle);
                        basedatos.SaveChanges();
                    }
                }
                transaccion.Commit();
            }
        }
        catch (Exception ex)
        {
            if (transaccion != null)
                transaccion.Rollback();

            throw new Exception(ex.ToString());
        }
    }
}
