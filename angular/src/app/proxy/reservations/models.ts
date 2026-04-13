
export interface CancelReservationDto {
  externalIdentifier: number;
}

export interface CheckInReservationDto {
  externalIdentifier: number;
  roomNumber?: string;
  branchCode?: string;
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
}

export interface CreateGuestDto {
  fullName?: string;
  identityNum?: string;
  identityType?: string;
  checkInDate?: string;
  nationality?: string;
}

export interface ReservationGridDto {
  externalIdentifier: number;
  fullName?: string;
  identityNum?: string;
  roomNumber?: string;
  checkInDate?: string;
  checkOutDate?: string;
  escortsCount: number;
  status?: string;
  branchCode?: string;
}
