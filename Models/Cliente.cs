using System;
using System.Collections.Generic;

namespace net_angular.Models;

public partial class Cliente
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Email { get; set; } = null!;

    public byte[] Password { get; set; } = null!;

    public DateTime FechaAlta { get; set; }

    public DateTime? FechaBaja { get; set; }

    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
