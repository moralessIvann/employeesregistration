using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using net_angular.Models;
using net_angular.Models.ViewModels;
using System.Text;

namespace net_angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly IConfiguration configuration;
        public ClientesController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        
        [HttpGet]
        public IActionResult ConsultarCliente()
        {
            Resultado res = new Resultado();

            try
            {
                using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
                {
                    var lista = basedatos.Clientes.ToList();
                    res.ObjetoGenerico = lista;

                    // devolviendo un json con los clientes de la bd
                    // return Ok(lista);
                }
            }
            catch (Exception ex)
            {

                res.Error = "Se produjo un error al obtener los clientes" + ex.Message;
            }
            return Ok(res);
        }

        [HttpPost]
        public IActionResult AgregarCliente(ClienteViewModel c)
        {
            Resultado res = new Resultado();

            try
            {
                byte[] keyBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
                Util util = new Util(keyBytes);

                using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
                {
                    ClienteModel cliente = new ClienteModel();
                    cliente.Nombre = c.nombre;
                    cliente.Email = c.email;
                    // convertir password a array de bytes
                    cliente.Password = Encoding.ASCII.GetBytes(util.EncryptText(c.password, configuration["ClaveSecreta"]));
                    cliente.FechaAlta = DateTime.Now;
                    basedatos.Clientes.Add(cliente);
                    basedatos.SaveChanges();
                }
            }
            catch (Exception ex)
            {

                res.Error = "Se produjo un error al agregar los clientes" + ex.Message;
            }
            return Ok(res);
        }

        [HttpPut]
        public IActionResult EditarCliente(ClienteViewModel c)
        {
            Resultado res = new Resultado();

            try
            {
                byte[] keyBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
                Util util = new Util(keyBytes);

                using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
                {
                    // devuelve single cliente cuyo email corresponda al que se le pase con el objeto viewModel es decir el que venga
                    //en la peticion PUT
                    ClienteModel cliente = basedatos.Clientes.Single(client => client.Id == c.id);
                    cliente.Nombre = c.nombre;
                    // convertir password a array de bytes
                    cliente.Password = Encoding.ASCII.GetBytes(util.EncryptText(c.password, configuration["ClaveSecreta"]));

                    basedatos.Entry(cliente).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    basedatos.SaveChanges();
                }
            }
            catch (Exception ex)
            {

                res.Error = "Se produjo un error al editar clientes" + ex.Message;
            }
            return Ok(res);
        }

        [HttpDelete("{Email}")]
        public IActionResult BorrarCliente(string email)
        {
            Resultado res = new Resultado();

            try
            {
                using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
                {
                    // devuelve single cliente cuyo email corresponda al que se le pase con el objeto viewModel es decir el que venga
                    //en la peticion PUT
                    ClienteModel cliente = basedatos.Clientes.Single(client => client.Email == email);
                    basedatos.Remove(cliente);
                    basedatos.SaveChanges();
                }
            }
            catch (Exception ex)
            {

                res.Error = "Se produjo un error al borrar clientes" + ex.Message;
            }
            return Ok(res);
        }
    }
}
