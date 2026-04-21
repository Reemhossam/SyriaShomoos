using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace SyriaShomoos.Reservations
{
  public class ReservationFilterDto : PagedAndSortedResultRequestDto
  {
    public string? GuestName { get; set; }
    public string? Property { get; set; }
    public string? IdentityType { get; set; }
    public string? IdentityNumber { get; set; }
    public string? UnitNumber { get; set; }
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }
  }
}
