import type { CancelReservationDto, CheckInReservationDto, CheckOutReservationDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  apiName = 'Default';
  

  cancel = (input: CancelReservationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/reservation/cancel',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  checkIn = (input: CheckInReservationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/reservation/check-in',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  checkOut = (input: CheckOutReservationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/reservation/check-out',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
