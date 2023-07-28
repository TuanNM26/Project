﻿using System;
using System.Collections.Generic;

namespace CafeLibrary.Models;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public string? Name { get; set; }

    public string? Position { get; set; }

    public decimal? Salary { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
