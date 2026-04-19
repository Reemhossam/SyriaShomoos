using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyriaShomoos.Reservations
{
  public class DashboardSummaryDto
  {
    public int TotalReservations { get; set; }
    public int FlaggedReservations { get; set; }
    public int CheckedIn { get; set; }
    public int CheckedOut { get; set; }
    public int Cancelled { get; set; }
    public List<ReservationPerDayDto> ReservationsPerDay { get; set; } = new();
  }

  public class ReservationPerDayDto
  {
    public string Day { get; set; }
    public int Count { get; set; }
  }
}
