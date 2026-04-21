using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyriaShomoos.Reservations
{
    public class CheckInReservationDto
    {
        public long ExternalIdentifier { get; set; }
        public string RoomNumber { get; set; }
        public string BranchCode { get; set; }
        public string BranchName { get; set; }
        public string UserId { get; set; }
        public CreateGuestDto MainGuest { get; set; }
        public List<CreateEscortDto>? Escorts { get; set; }
        public string City { get; set; }
        public string Floor { get; set; }
        
        public DateTime? ActualCheckInTime { get; set; }
        public DateTime? ActualCheckOutTime { get; set; }
    }
}