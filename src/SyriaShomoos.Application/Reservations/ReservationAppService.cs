using SyriaShomoos.Entities;
using SyriaShomoos.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace SyriaShomoos.Reservations
{
    public class ReservationAppService : ApplicationService
    {
        private readonly IRepository<Reservation, Guid> _repository;
        private readonly IRepository<BranchSource, Guid> _branchRepository;

        public ReservationAppService(IRepository<Reservation, Guid> repository,
            IRepository<BranchSource, Guid> branchRepository)
        {
            _repository = repository;
            _branchRepository = branchRepository;
        }

        // CHECK-IN
        public async Task CheckInAsync(CheckInReservationDto input)
        {
            var reservation = await _repository.FirstOrDefaultAsync(x => x.ExternalIdentifier == input.ExternalIdentifier);
            var isReservationExist = reservation != null;
            var branch = await _branchRepository.FirstOrDefaultAsync(x => x.BranchCode == input.BranchCode);

            if (branch == null)
            {
                // Create branch
                branch = new BranchSource
                {
                    BranchCode = input.BranchCode,
                    BranchName = input.BranchName,
                    UserId = input.UserId
                };

                await _branchRepository.InsertAsync(branch);
            }

            if (reservation == null)
            {
                reservation = new Reservation
                {
                    ExternalIdentifier = input.ExternalIdentifier
                };
            }


            reservation.BranchSourceId = branch.Id;
            reservation.RoomNumber = input.RoomNumber;
            reservation.Status = ReservationStatus.CheckedIn;
            reservation.CheckInDate = DateTime.UtcNow;

            reservation.MainGuest = new Guest
            {
                ReservationId = reservation.Id,
                FullName = input.MainGuest.FullName,
                IdentityNum = input.MainGuest.IdentityNum,
                IdentityType = input.MainGuest.IdentityType,
                Nationality = input.MainGuest.Nationality,
                CheckInDate = input.MainGuest.CheckInDate
            };

            reservation.Escorts = input.Escorts?.Select(x => new GuestEscort
            {
                ReservationId = reservation.Id,
                FullName = x.FullName,
                IdentityNum = x.IdentityNum,
                IdentityType = x.IdentityType,
                Nationality = x.Nationality,
                CheckInDate = x.CheckInDate
            }).ToList() ?? new List<GuestEscort>();
            if (isReservationExist)
            {
                await _repository.UpdateAsync(reservation);
            }
            else
            {
                await _repository.InsertAsync(reservation);
            }
        }

        public async Task CheckOutAsync(CheckOutReservationDto input)
        {
            var repo = await _repository.WithDetailsAsync(x => x.MainGuest , x=> x.Escorts);
            
            var reservation = repo.FirstOrDefault(x => x.ExternalIdentifier == input.ExternalIdentifier);

            if (reservation == null)
                throw new UserFriendlyException("Reservation not found");

            if (reservation.Status != ReservationStatus.CheckedIn)
                throw new UserFriendlyException("Reservation is not checked in");

            reservation.Status = ReservationStatus.CheckedOut;
            reservation.CheckOutDate = DateTime.UtcNow;
            if (reservation.MainGuest != null)
            {
                reservation.MainGuest.CheckOutDate = input.CheckOutDate;
                reservation.MainGuest.Rating = input.Rating;
            }

            foreach (var escort in reservation.Escorts)
            {
                escort.CheckOutDate = input.CheckOutDate;
                escort.Rating = input.Rating;
            }

            await _repository.UpdateAsync(reservation);
        }

        public async Task CancelAsync(CancelReservationDto input)
        {
            var reservation =
                await _repository.FirstOrDefaultAsync(x => x.ExternalIdentifier == input.ExternalIdentifier);

            if (reservation == null)
                throw new UserFriendlyException("Reservation not found");

            if (reservation.Status == ReservationStatus.CheckedOut)
                throw new UserFriendlyException("Cannot cancel after checkout");
            reservation.CancelDate = DateTime.UtcNow;
            reservation.Status = ReservationStatus.Cancelled;

            await _repository.UpdateAsync(reservation);
        }
    }
}