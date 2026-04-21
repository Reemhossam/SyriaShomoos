import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CancelReservationDto {
  externalIdentifier: number;
}

export interface CheckInReservationDto {
  externalIdentifier: number;
  roomNumber?: string;
  branchCode?: string;
  branchName?: string;
  userId?: string;
  mainGuest: CreateGuestDto;
  escorts: CreateEscortDto[];
  city?: string;
  floor?: string;
  actualCheckInTime?: string;
  actualCheckOutTime?: string;
}

export interface CheckOutReservationDto {
  externalIdentifier: number;
  checkOutDate?: string;
  rating: number;
}

export interface ConvictFilterDto {
  guestName?: string;
  hotelName?: string;
  idNumber?: string;
  reservationNumber?: string;
  address?: string;
  nationality?: string;
  dateOfBirth?: string;
}

export interface ConvictGridDto {
  fullName?: string;
  hotelName?: string;
  nationality?: string;
  idNumber?: string;
  reservationNumber?: string;
  address?: string;
  dateOfBirth?: string;
  note?: string;
}

export interface CreateEscortDto {
  fullName?: string;
  identityNum?: string;
  identityType?: string;
  checkInDate?: string;
  nationality?: string;
  dateOfBirth?: string;
}

export interface CreateGuestDto {
  fullName?: string;
  identityNum?: string;
  identityType?: string;
  checkInDate?: string;
  checkOutDate?: string;
  nationality?: string;
  dateOfBirth?: string;
  address?: string;
  parentName?: string;
  versionNumber?: number;
  profession?: string;
  motherName?: string;
  placeOfBirth?: string;
  currentResidenceCountry?: string;
  issueCountry?: string;
}

export interface DashboardSummaryDto {
  totalReservations: number;
  flaggedReservations: number;
  checkedIn: number;
  checkedOut: number;
  cancelled: number;
  reservationsPerDay: ReservationPerDayDto[];
}

export interface ReservationFilterDto extends PagedAndSortedResultRequestDto {
  guestName?: string;
  property?: string;
  identityType?: string;
  identityNumber?: string;
  unitNumber?: string;
  fromDate?: string;
  toDate?: string;
}

export interface ReservationGridDto {
  externalIdentifier: number;
  fullName?: string;
  guestNationality?: string;
  guestParentName?: string;
  guestDateOfBirth?: string;
  guestAddress?: string;
  identityType?: string;
  identityNum?: string;
  propertyName?: string;
  city?: string;
  floor?: string;
  roomNumber?: string;
  checkInDate?: string;
  checkOutDate?: string;
  actualCheckInDate?: string;
  actualCheckOutDate?: string;
  escortsCount: number;
  status?: string;
  branchCode?: string;
  profession?: string;
  motherName?: string;
  placeOfBirth?: string;
  currentResidenceCountry?: string;
  issueCountry?: string;
}

export interface ReservationPerDayDto {
  day?: string;
  count: number;
}
