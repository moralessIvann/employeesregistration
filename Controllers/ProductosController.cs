using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using net_angular.Models;

namespace net_angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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

                    // devolviendo un json con los clientes de la bd
                    // return Ok(lista);
                }
            }
            catch (Exception ex)
            {

                res.Error = "Se produjo un error al obtener los productos" + ex.Message;
            }
            return Ok(res);
        }
    }
}
