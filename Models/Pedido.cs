using System;
using System.Collections.Generic;

namespace net_angular.Models;

public partial class Pedido
{
    public int Id { get; set; }

    public int IdCliente { get; set; }

    public decimal Total { get; set; }

    public DateTime FechaPedido { get; set; }

    public virtual Cliente IdClienteNavigation { get; set; } = null!;

    public virtual ICollection<LineasPedido> LineasPedidos { get; set; } = new List<LineasPedido>();
}
