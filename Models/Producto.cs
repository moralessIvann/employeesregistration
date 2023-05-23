﻿using System;
using System.Collections.Generic;

namespace net_angular.Models;

public partial class Producto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public decimal Precio { get; set; }

    public string Descripcion { get; set; } = null!;

    public virtual ICollection<LineasPedido> LineasPedidos { get; set; } = new List<LineasPedido>();
}
