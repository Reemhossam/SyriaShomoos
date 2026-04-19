import type { ConvictFilterDto, ConvictGridDto, DashboardSummaryDto, ReservationFilterDto, ReservationGridDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReservationReadService {
  apiName = 'Default';
  

  getConvicts = (filter: ConvictFilterDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ConvictGridDto[]>({
      method: 'GET',
      url: '/api/app/reservation-read/convicts',
      params: { guestName: filter.guestName, hotelName: filter.hotelName, idNumber: filter.idNumber, reservationNumber: filter.reservationNumber, address: filter.address, nationality: filter.nationality, dateOfBirth: filter.dateOfBirth },
    },
    { apiName: this.apiName,...config });
  

  getDashboard = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DashboardSummaryDto>({
      method: 'GET',
      url: '/api/app/reservation-read/dashboard',
    },
    { apiName: this.apiName,...config });
  

  getDetailedStatistics = (input: ReservationFilterDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ReservationGridDto[]>({
      method: 'GET',
      url: '/api/app/reservation-read/detailed-statistics',
      params: { guestName: input.guestName, property: input.property, identityType: input.identityType, identityNumber: input.identityNumber, unitNumber: input.unitNumber, fromDate: input.fromDate, toDate: input.toDate },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
