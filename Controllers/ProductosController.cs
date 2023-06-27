using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;
using net_angular.Models;
using net_angular.Models.ViewModels;

namespace net_angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductosController : ControllerBase
    {
        [HttpGet]
        public IActionResult ConsultarProducto()
        {
            ResultadoJson res = new ResultadoJson();

            try
            {
                using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
                {
                    var lista = basedatos.Productos.ToList();
                    res.ObjetoGenerico = lista;
                }
            }
            catch (Exception ex)
            {

                res.Error = "Se produjo un error al obtener los productos" + ex.Message;
            }
            return Ok(res);
        }
        
        [HttpPost]
        public IActionResult AgregarPedido(PedidoViewModel p)
        {
            ResultadoJson res = new ResultadoJson();
            IDbContextTransaction transaccion = null;

            try
            {
                using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
                {
                    transaccion = basedatos.Database.BeginTransaction();
                    {
                        var pedido = new Pedido();
                        pedido.Total = p.DetallesPedido.Sum(p => p.Cantidad * p.ImporteUnitario);
                        pedido.Total = p.Total;
                        pedido.IdCliente = p.IdCliente;
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
                }
            }
            catch (Exception ex)
            {
                if (transaccion != null)
                {
                    transaccion.Rollback();
                }
                res.Error = "Se produjo un error al realizar el pedido" + ex.Message;
            }
            return Ok(res);
        }
    }
}
