using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyriaShomoos.Reservations
{
  public class CreateGuestDto
  {
    public string FullName { get; set; }
    public string IdentityNum { get; set; }
    public string IdentityType { get; set; }
    public DateTime CheckInDate { get; set; }
    public string Nationality { get; set; }
  }
}
