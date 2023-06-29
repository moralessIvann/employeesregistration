using net_angular.Models;
using net_angular.Models.ViewModels;

namespace net_angular.Servicios;

public interface IProductos
{
    public List<Producto> DameProductos();

    public void AgregarPedido(PedidoViewModel p);

}
