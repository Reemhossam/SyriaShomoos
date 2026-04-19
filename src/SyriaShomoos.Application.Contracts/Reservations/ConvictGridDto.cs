using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyriaShomoos.Reservations
{
  public class ConvictGridDto
  {
    public string FullName { get; set; }
    public string HotelName { get; set; }
    public string Nationality { get; set; }
    public string IdNumber { get; set; }
    public string ReservationNumber { get; set; }
    public string Address { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Note { get; set; }
  }
}
