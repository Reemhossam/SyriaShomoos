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
    public string GuestNationality { get; set; }
    public string GuestParentName { get; set; }  
    public DateTime? GuestDateOfBirth { get; set; }
    public string GuestAddress { get; set; }
    public string IdentityType { get; set; }
    public string IdentityNum { get; set; }
    public string PropertyName { get; set; }
    public string City { get; set; }
    public string Floor { get; set; }
    public string RoomNumber { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime? CheckOutDate { get; set; }
    public DateTime? ActualCheckInDate { get; set; }
    public DateTime? ActualCheckOutDate { get; set; }
    public int EscortsCount { get; set; }
    public string Status { get; set; }
    public string BranchCode { get; set; }
  }
}
