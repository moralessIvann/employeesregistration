using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using net_angular.Models;
using net_angular.Models.ViewModels;
using net_angular.Servicios;
using System.Text;

namespace net_angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ClientesController : ControllerBase
    {
        private readonly ILogger<ClientesController> log;
        private IClientes clientesServicio;
        public ClientesController(ILogger<ClientesController> l, IClientes clientesServicio)
        {
            this.log = l;
            this.clientesServicio = clientesServicio;
        }
        
        [HttpGet]
        public IActionResult DameClientes()
        {
            ResultadoJson res = new ResultadoJson();

            try
            {
                var lista = clientesServicio.DameClientes();
                res.ObjetoGenerico = lista;
            }

            catch (Exception ex)
            {

                res.Error = "Se produjo un error al obtener los clientes" + ex.Message;
                res.Texto = "Se produjo un error al obtener los clientes";
                log.LogError("Se produjo un error al obtener los clientes" + ex.ToString());
            }
            return Ok(res);
        }

        [HttpPost]
        public IActionResult AgregarCliente(ClienteViewModel c)
        {
            ResultadoJson res = new ResultadoJson();

            try
            {
                clientesServicio.AgregarCliente(c);
            }
            catch (Exception ex)
            {
                res.Error = "Se produjo un error al agregar los clientes" + ex.Message;
                res.Texto = "Se produjo un error al agregar los clientes" + ex.Message;
                log.LogError("Se produjo un error al obtener al dar el alta: " + ex.ToString());
            }
            return Ok(res);
        }

        [HttpPut]
        public IActionResult EditarCliente(ClienteViewModel c)
        {
            ResultadoJson res = new ResultadoJson();

            try
            {
                clientesServicio.EditarCliente(c);
            }
            catch (Exception ex)
            {

                res.Error = "Se produjo un error al editar cliente" + ex.Message;
                res.Texto = "Se produjo un error al editar cliente" + ex.Message;
                log.LogError("Se produjo un error al editar cliente: " + ex.ToString());
            }
            return Ok(res);
        }

        [HttpDelete("{Email}")]
        public IActionResult BorrarCliente(String email)
        {
            ResultadoJson res = new ResultadoJson();

            try
            {
                clientesServicio.BorrarCliente(email);
            }
            catch (Exception ex)
            {

                res.Error = "Se produjo un error al borrar clientes" + ex.Message;
                res.Texto = "Se produjo un error al borrar cliente" + ex.Message;
                log.LogError("Se produjo un error al borrar cliente: " + ex.ToString());
            }
            return Ok(res);
        }

        [HttpPost("Login")]
        public IActionResult Login(ClienteViewModel c)
        {
            ResultadoJson resultado = new ResultadoJson();

            try
            {
                byte[] keyBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
                Util util = new Util(keyBytes);

                ClienteViewModel cliente = clientesServicio.Login(c);
                resultado.ObjetoGenerico = cliente;
            }
            catch (Exception ex)
            {

                resultado.Error = "Se produjo un error al iniciar sesion" + ex.ToString();
                resultado.Texto = "Usuario o password incorrecta";
                log.LogError("Se produjo un error al iniciar sesion" + ex.ToString());
            }
            
            return Ok(resultado);
        }
    
    }
}
