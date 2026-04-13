import type { ReservationGridDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReservationReadService {
  apiName = 'Default';
  

  getList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ReservationGridDto[]>({
      method: 'GET',
      url: '/api/app/reservation-read',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
