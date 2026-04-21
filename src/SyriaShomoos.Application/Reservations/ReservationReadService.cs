using Microsoft.EntityFrameworkCore;
using SyriaShomoos.Entities;
using SyriaShomoos.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
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

    public async Task<PagedResultDto<ReservationGridDto>> GetDetailedStatisticsAsync(ReservationFilterDto input)
    {
      var query = await _repository.WithDetailsAsync(
                 x => x.MainGuest,
                 x => x.Escorts,
                 x => x.BranchSource);

      if (!string.IsNullOrWhiteSpace(input.GuestName))
        query = query.Where(x => x.MainGuest.FullName.Contains(input.GuestName));
      if (!string.IsNullOrWhiteSpace(input.Property))
        query = query.Where(x => x.BranchSource.BranchName.Contains(input.Property));
      if (!string.IsNullOrWhiteSpace(input.IdentityNumber))
        query = query.Where(x => x.MainGuest.IdentityNum.Contains(input.IdentityNumber));
      if (!string.IsNullOrWhiteSpace(input.UnitNumber))
        query = query.Where(x => x.RoomNumber.Contains(input.UnitNumber));
      if (input.FromDate.HasValue)
        query = query.Where(x => x.CheckInDate >= input.FromDate.Value);
      if (input.ToDate.HasValue)
        query = query.Where(x => x.CheckOutDate <= input.ToDate.Value);
      
      
      var sortedQueryable = query.OrderByDescending(x => x.Id); // or searchCriteria.Sorting
      var data = sortedQueryable
        .Skip(input.SkipCount)
        .Take(input.MaxResultCount)
        .Select(x => new ReservationGridDto
        {
          ExternalIdentifier = x.ExternalIdentifier,
          FullName = x.MainGuest.FullName,
          GuestNationality = x.MainGuest.Nationality,
          GuestParentName = x.MainGuest.ParentName,
          GuestDateOfBirth = x.MainGuest.DateOfBirth,
          GuestAddress = x.MainGuest.Address,
          IdentityType = x.MainGuest.IdentityType,
          IdentityNum = x.MainGuest.IdentityNum,
          PropertyName = x.BranchSource.BranchName,
          City = x.BranchSource.City,
          Floor = x.Floor,
          RoomNumber = x.RoomNumber,
          CheckInDate = x.MainGuest.CheckInDate,
          CheckOutDate = x.MainGuest.CheckOutDate,
          ActualCheckInDate = x.ActualCheckInTime,
          ActualCheckOutDate = x.ActualCheckOutTime,
          EscortsCount = x.Escorts.Count,
          Status = x.Status.ToString(),
          BranchCode = x.BranchSource.BranchCode,
          CurrentResidenceCountry = x.MainGuest.CurrentResidenceCountry,
          IssueCountry = x.MainGuest.IssueCountry,
          Profession = x.MainGuest.Profession,
          MotherName = x.MainGuest.MotherName,
          PlaceOfBirth = x.MainGuest.PlaceOfBirth
        })
        .ToList();


      var count = await AsyncExecuter.CountAsync(query); // Count before paging

      var result = new PagedResultDto<ReservationGridDto>
      {
        Items = data,
        TotalCount = count
      };

      return result;
      
    }

    public async Task<DashboardSummaryDto> GetDashboardAsync()
    {
      var query = await _repository.GetQueryableAsync();

      var total = await query.CountAsync();
      //var flagged = await query.CountAsync(x => x.Status == ReservationStatus.Flagged);

      var checkedIn = await query.CountAsync(x => x.Status == ReservationStatus.CheckedIn);
      var checkedOut = await query.CountAsync(x => x.Status == ReservationStatus.CheckedOut);
      var cancelled = await query.CountAsync(x => x.Status == ReservationStatus.Cancelled);

      var last7Days = DateTime.Today.AddDays(-6);

      var dailyCounts = await query
          .Where(x => x.CheckInDate >= last7Days)
          .GroupBy(x => x.CheckInDate.Date)
          .Select(g => new ReservationPerDayDto
          {
            Day = g.Key.ToString("ddd"),
            Count = g.Count()
          })
          .ToListAsync();

      return new DashboardSummaryDto
      {
        TotalReservations = total,
        //FlaggedReservations = flagged,
        CheckedIn = checkedIn,
        CheckedOut = checkedOut,
        Cancelled = cancelled,
        ReservationsPerDay = dailyCounts
      };
    }

    public async Task<List<ConvictGridDto>> GetConvictsAsync(ConvictFilterDto filter)
    {
      var query = await _repository.WithDetailsAsync(x => x.MainGuest, x => x.BranchSource);
      
      if (!string.IsNullOrWhiteSpace(filter.GuestName))
        query = query.Where(x => x.MainGuest.FullName.Contains(filter.GuestName));

      if (!string.IsNullOrWhiteSpace(filter.HotelName))
        query = query.Where(x => x.BranchSource.BranchName.Contains(filter.HotelName));

      if (!string.IsNullOrWhiteSpace(filter.IdNumber))
        query = query.Where(x => x.MainGuest.IdentityNum.Contains(filter.IdNumber));

      if (!string.IsNullOrWhiteSpace(filter.ReservationNumber))
        query = query.Where(x => x.ExternalIdentifier.ToString().Contains(filter.ReservationNumber));

      if (!string.IsNullOrWhiteSpace(filter.Address))
        query = query.Where(x => x.MainGuest.Address.Contains(filter.Address));

      if (!string.IsNullOrWhiteSpace(filter.Nationality))
        query = query.Where(x => x.MainGuest.Nationality == filter.Nationality);

      if (filter.DateOfBirth.HasValue)
        query = query.Where(x => x.MainGuest.DateOfBirth.Date == filter.DateOfBirth.Value.Date);
      return await query
          //.Where(x => x.IsFlagged == true)
          .Select(x => new ConvictGridDto
          {
            FullName = x.MainGuest.FullName,
            HotelName = x.BranchSource.BranchName,
            Nationality = x.MainGuest.Nationality,
            IdNumber = x.MainGuest.IdentityNum,
            ReservationNumber = x.ExternalIdentifier.ToString(),
            Address = x.MainGuest.Address,
            DateOfBirth = x.MainGuest.DateOfBirth,
            //Note = x.FlagReason
          })
          .ToListAsync();
    }


  }
}
