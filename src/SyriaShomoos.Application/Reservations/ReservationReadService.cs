using Microsoft.EntityFrameworkCore;
using SyriaShomoos.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace SyriaShomoos.Reservations
{
  public class ReservationReadService : ApplicationService
  {
    private readonly IRepository<Reservation, Guid> _repository;

    public ReservationReadService(IRepository<Reservation, Guid> repository)
    {
      _repository = repository;
    }

    public async Task<List<ReservationGridDto>> GetListAsync()
    {
      var query = await _repository.WithDetailsAsync(
          x => x.MainGuest,
          x => x.Escorts,
          x => x.BranchSource);

      return await query.Select(x => new ReservationGridDto
      {
        ExternalIdentifier = x.ExternalIdentifier,
        FullName = x.MainGuest.FullName,
        IdentityNum = x.MainGuest.IdentityNum,
        RoomNumber = x.RoomNumber,
        CheckInDate = x.MainGuest.CheckInDate,
        CheckOutDate = x.MainGuest.CheckOutDate,
        EscortsCount = x.Escorts.Count,
        Status = x.Status.ToString(),
        BranchCode = x.BranchSource.BranchCode
      }).ToListAsync();
    }
  }
}
