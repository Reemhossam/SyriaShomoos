using SyriaShomoos.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace SyriaShomoos.Entities
{
  public class Reservation : FullAuditedAggregateRoot<Guid>
  {
    public long ExternalIdentifier { get; set; }
    
    public DateTime CheckInDate { get; set; }
    public DateTime? CancelDate { get; set; }
    public DateTime? CheckOutDate { get; set; }
    public string RoomNumber { get; set; }
    public ReservationStatus Status { get; set; }
    public Guid BranchSourceId { get; set; }
    public BranchSource BranchSource { get; set; }
    public Guest MainGuest { get; set; }
    public List<GuestEscort> Escorts { get; set; } = new();
  }
}
