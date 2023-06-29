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
    // [Authorize]
    public class UsuarioAPIController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private IUsuarioAPI usuarioAPIServicio;
        private readonly ILogger<UsuarioAPIController> log;

        public UsuarioAPIController(IConfiguration configuration, IUsuarioAPI usuarioAPIServicio,
            ILogger<UsuarioAPIController> l)
        {
            this.configuration = configuration;
            this.usuarioAPIServicio = usuarioAPIServicio;
            this.log = l;
        }
        // Se utilizo de forma temporal para hacer alta de clientes
        /*
        [HttpPost("Alta")]
        public IActionResult AltaUsuario(AuthenticationAPI usuarioAPI)
        {
            ResultadoJson resultadoJson = new ResultadoJson();
            try
            {
                byte[] keyBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
                Util util = new Util(keyBytes);

                // usando using se liberan conexiones automaticamente en vez de crear objetos y usar dispose
                using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
                {
                    UsuariosApi api = new UsuariosApi();
                    api.Email = usuarioAPI.email;
                    api.Password = Encoding.ASCII.GetBytes(util.EncryptText(usuarioAPI.password, configuration["ClaveSecreta"]));
                    api.FechaAlta = DateTime.Now;
                    basedatos.UsuariosApis.Add(api);
                    basedatos.SaveChanges();
                }
                    
            }
            catch (Exception ex)
            {
                resultadoJson.Error = "Se produjo un error al dar cliente de alta en el API" + ex.ToString();
            }

            return Ok(resultadoJson);
        }
        */

        [HttpPost]
        public IActionResult DameUsuarioAPI(AuthenticationAPI auth)
        {
            ResultadoJson resultadoJson = new ResultadoJson();

            try
            {
                resultadoJson.ObjetoGenerico = usuarioAPIServicio.Autenticacion(auth);

            }
            catch (Exception ex)
            {
                resultadoJson.Error = "Se produjo un error al obtener usuario del API" + ex.ToString();
                log.LogError("Error al obtener usuario de API:" + ex.ToString());
            }

            return Ok(resultadoJson);
        }
    }
}
