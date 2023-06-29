using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;
using net_angular.Models;
using net_angular.Models.ViewModels;
using net_angular.Servicios;

namespace net_angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductosController : ControllerBase
    {
        private IProductos productoServicio;
        private readonly ILogger<ProductosController> log;
        public ProductosController(IProductos productoServicio, ILogger<ProductosController> l)
        {
            this.productoServicio = productoServicio;
            this.log = l;
        }

        [HttpGet]
        public IActionResult ConsultarProducto()
        {
            ResultadoJson res = new ResultadoJson();

            try
            {

                var lista = productoServicio.DameProductos();
                res.ObjetoGenerico = lista;
                
            }
            catch (Exception ex)
            {

                res.Error = "Se produjo un error al obtener los productos" + ex.Message;
                log.LogError("Error al obtener libros:" + ex.ToString());
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
                productoServicio.AgregarPedido(p);
            }
            catch (Exception ex)
            {
                res.Texto = "Se produjo un error al realizar pedido";
                res.Error = "Se produjo un error al realizar el pedido" + ex.Message;
                log.LogError("Se produjo un error al realizar el pedido" + ex.ToString());
            }
            return Ok(res);
        }
    }
}
