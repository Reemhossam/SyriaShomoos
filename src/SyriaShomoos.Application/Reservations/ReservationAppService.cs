using SyriaShomoos.Entities;
using SyriaShomoos.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Uow;

namespace SyriaShomoos.Reservations
{
    public class ReservationAppService : ApplicationService
    {
        private readonly IRepository<Reservation, Guid> _repository;
        private readonly IRepository<BranchSource, Guid> _branchRepository;
        private readonly UnitOfWorkManager _unitOfWorkManager;
        
        public ReservationAppService(IRepository<Reservation, Guid> repository,
            IRepository<BranchSource, Guid> branchRepository, UnitOfWorkManager unitOfWorkManager)
        {
            _repository = repository;
            _branchRepository = branchRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        // CHECK-IN
        public async Task CheckInAsync(CheckInReservationDto input)
        {
            var reservation = (await _repository.WithDetailsAsync(x=> x.MainGuest)).FirstOrDefault(x => x.ExternalIdentifier == input.ExternalIdentifier);
            
            var isReservationExist = reservation != null;
            var branch = await _branchRepository.FirstOrDefaultAsync(x => x.BranchCode == input.BranchCode);

            if (branch == null)
            {
                // Create branch
                branch = new BranchSource
                {
                    BranchCode = input.BranchCode,
                    BranchName = input.BranchName,
                    UserId = input.UserId,
                    City = input.City
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
            reservation.Floor = input.Floor;
            
            var guest = new Guest
            {
                ReservationId = reservation.Id,
                FullName = input.MainGuest.FullName,
                IdentityNum = input.MainGuest.IdentityNum,
                IdentityType = input.MainGuest.IdentityType,
                Nationality = input.MainGuest.Nationality,
                CheckInDate = input.MainGuest.CheckInDate,
                DateOfBirth = input.MainGuest.DateOfBirth,
                Address = input.MainGuest.Address,
                ParentName = input.MainGuest.ParentName
            };

            if (reservation.Id == Guid.Empty)
            {
                reservation.MainGuest = guest;
            }
            else
            {
                reservation.MainGuest.Address = guest.Address;
                reservation.MainGuest.CheckInDate = guest.CheckInDate;
                reservation.MainGuest.DateOfBirth = guest.DateOfBirth;
                reservation.MainGuest.FullName = guest.FullName;
                reservation.MainGuest.IdentityNum = guest.IdentityNum;
                reservation.MainGuest.IdentityType = guest.IdentityType;
                reservation.MainGuest.Nationality = guest.Nationality;
                reservation.MainGuest.ParentName = guest.ParentName;
            }
            reservation.Escorts = input.Escorts?.Select(x => new GuestEscort
            {
                ReservationId = reservation.Id,
                FullName = x.FullName,
                IdentityNum = x.IdentityNum,
                IdentityType = x.IdentityType,
                Nationality = x.Nationality,
                CheckInDate = x.CheckInDate,
                DateOfBirth = x.DateOfBirth
            }).ToList() ?? new List<GuestEscort>();
            if (isReservationExist)
            {
                await _repository.UpdateAsync(reservation);
            }
            else
            {
                await _repository.InsertAsync(reservation);
            }
            await _unitOfWorkManager.Current!.SaveChangesAsync();
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
            await _unitOfWorkManager.Current!.SaveChangesAsync();
            
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
            await _unitOfWorkManager.Current!.SaveChangesAsync();
            
        }
    }
}