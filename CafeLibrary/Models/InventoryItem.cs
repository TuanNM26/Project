using System;
using System.Collections.Generic;

namespace CafeLibrary.Models;

public partial class InventoryItem
{
    public int InventoryItemId { get; set; }

    public string? Name { get; set; }

    public int? Quantity { get; set; }

    public decimal? UnitPrice { get; set; }
}
