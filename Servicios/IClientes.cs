using net_angular.Models;
using net_angular.Models.ViewModels;

namespace net_angular.Servicios;

public interface IClientes
{
    public List<Cliente> DameClientes();

    public Cliente ConsultarCliente(ClienteViewModel c);
    public void AgregarCliente(ClienteViewModel c);
    public void EditarCliente(ClienteViewModel c);
    public void BorrarCliente(String email);
    public ClienteViewModel Login(ClienteViewModel c);


}
