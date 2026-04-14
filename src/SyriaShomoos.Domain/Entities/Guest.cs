using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;

namespace SyriaShomoos.Entities
{
  public class Guest : Entity<Guid>
  {
    public Guid ReservationId { get; set; }
    public string FullName { get; set; }
    public string IdentityNum { get; set; }
    public string IdentityType { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime? CheckOutDate { get; set; }
    public string Nationality { get; set; }
    public int? VersionNumber { get; set; }
    public double? Rating { get; set; }
    
    public string DateOfBirth { get; set; }
    
  }
}
