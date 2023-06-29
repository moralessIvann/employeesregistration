using net_angular.Models;
using net_angular.Models.ViewModels;
using System.Text;

namespace net_angular.Servicios;

public class ClienteServicio : IClientes
{
    private readonly IConfiguration configuration;

    public ClienteServicio(IConfiguration configuration)
    {
        this.configuration = configuration;
    }

    public List<Cliente> DameClientes()
    {
        List<Cliente> lista;

        using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
        {
            lista = basedatos.Clientes.ToList();
        }

        return lista;
    }

    public void AgregarCliente(ClienteViewModel c)
    {
        byte[] keyBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
        Util util = new Util(keyBytes);

        using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
        {
            Cliente cliente = basedatos.Clientes.Single(cli => cli.Email == c.email);
            cliente.Nombre = c.nombre;
            cliente.Password = Encoding.ASCII.GetBytes(util.EncryptText(c.password, configuration["ClaveSecreta"]));
            basedatos.Entry(cliente).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            basedatos.SaveChanges();
        }
    }

    public void BorrarCliente(String email)
    {
        using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
        {
            Cliente cliente = basedatos.Clientes.Single(client => client.Email == email);
            cliente.FechaBaja = DateTime.Now;
            basedatos.Entry(cliente).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            basedatos.SaveChanges();
        }
    }

    public void EditarCliente(ClienteViewModel c)
    {
        byte[] keyBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
        Util util = new Util(keyBytes);

        using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
        {
            Cliente cliente = basedatos.Clientes.Single(client => client.Email == c.email);
            cliente.Nombre = c.nombre;
            cliente.Password = Encoding.ASCII.GetBytes(util.EncryptText(c.password, configuration["ClaveSecreta"]));
            basedatos.Entry(cliente).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            basedatos.SaveChanges();
        }
    }

    public ClienteViewModel Login(ClienteViewModel c)
    {
        byte[] keyBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
        Util util = new Util(keyBytes);

        using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
        {
            Cliente cliente = basedatos.Clientes.Single(cli => cli.Email == c.email);
            if (cliente == null || c.password != util.DecryptText(Encoding.ASCII.GetString(cliente.Password), configuration["ClaveSecreta"]))
                throw new Exception("Error al iniciar sesion");
        }
        return c;
    }
}
