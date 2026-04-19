
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
}

export interface CheckOutReservationDto {
  externalIdentifier: number;
  checkOutDate?: string;
  rating: number;
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
  nationality?: string;
  dateOfBirth?: string;
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
}
