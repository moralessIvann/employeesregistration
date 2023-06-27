namespace net_angular.Models.ViewModels;

public class PedidoViewModel
{
    public int IdCliente { get; set; }

    public decimal Total { get; set; }

    public List<LineasPedidoViewModel> DetallesPedido { get; set; }

    public PedidoViewModel() { this.DetallesPedido = new List<LineasPedidoViewModel>(); }

}

public class LineasPedidoViewModel
{
    public int IdProducto { get; set; }

    public int Cantidad { get; set; }

    public decimal ImporteUnitario { get; set; }
}
