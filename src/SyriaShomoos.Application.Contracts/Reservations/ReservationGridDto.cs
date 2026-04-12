using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyriaShomoos.Reservations
{
  public class ReservationGridDto
  {
    public long ExternalIdentifier { get; set; }
    public string FullName { get; set; }
    public string IdentityNum { get; set; }
    public string RoomNumber { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime? CheckOutDate { get; set; }
    public int EscortsCount { get; set; }
    public string Status { get; set; }
    public string BranchCode { get; set; }
  }
}
