using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyriaShomoos.Reservations
{
    public class CheckOutReservationDto
    {
        public long ExternalIdentifier { get; set; }
        public DateTime CheckOutDate { get; set; }
        public double Rating { get; set; }
    }
}