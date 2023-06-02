using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using net_angular.Models;
using net_angular.Models.ViewModels;
using System.Text;

namespace net_angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioAPIController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public UsuarioAPIController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

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

        [HttpGet("{Email}/{Pass}")]

        public IActionResult DameUsuarioAPI(string Email, string Password)
        {
            AuthenticationAPI authentication = new AuthenticationAPI();
            ResultadoJson resultadoJson = new ResultadoJson();

            try
            {
                byte[] keyBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
                Util util = new Util(keyBytes);

                using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
                {
                    UsuariosApi cliente = basedatos.UsuariosApis.Single(usuario => usuario.Email == Email);
                    authentication.password = util.DecryptText(Encoding.ASCII.GetString(cliente.Password), configuration["ClaveCifrado"]);
                    authentication.email = cliente.Email;
                    if (Password == authentication.password)
                        resultadoJson.ObjetoGenerico = authentication;
                    else
                        throw new Exception("Usuario desconocido");
                }

            }
            catch (Exception ex)
            {
                resultadoJson.Error = "Se produjo un error al obtener cliente de alta en el API" + ex.ToString();
            }

            return Ok(resultadoJson);
        }
    }
}
