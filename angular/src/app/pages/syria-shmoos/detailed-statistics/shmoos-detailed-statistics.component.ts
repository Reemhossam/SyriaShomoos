import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ReservationFilterDto, ReservationGridDto, ReservationReadService } from '@proxy/reservations';
import type { PagedResultDto } from '@abp/ng.core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation.service';

export enum GuestIdType {
  NationalId = 1,
  FamilyId = 2,
  Passport = 3,
  ResidentPermit = 4,
  GccId = 5,
  VisitorId = 6
}

@Component({
  selector: 'app-shmoos-detailed-statistics',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule, SelectModule, DatePickerModule, TranslateModule],
  templateUrl: './shmoos-detailed-statistics.component.html',
  styleUrl: './shmoos-detailed-statistics.component.scss'
})
export class ShmoosDetailedStatisticsComponent implements OnInit {
  showFilter = true;
  reservations: ReservationGridDto[] = [];
  allReservations: ReservationGridDto[] = [];
  totalRecords = 0;
  isLoading = false;

  pageSize = 7;
  pageIndex = 0;

  idTypesList: any[] = [];

  // API Filters
  filterGuestName: string | null = null;
  filterPropertyName: string | null = null;
  filterGuestIdType: string | null = null;
  filterUnitNumber: string | null = null;
  filterIdNumber: string | null = null;
  filterDateFrom: Date | null = null;
  filterDateTo: Date | null = null;


  constructor(
    private reservationReadService: ReservationReadService,
    private translationService: TranslationService,
    private translate: TranslateService
  ) { }



  ngOnInit() {

    this.idTypesList = Object.keys(GuestIdType)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        label: `RECORDS.ID_TYPES.${key}`,
        value: GuestIdType[key as keyof typeof GuestIdType]
      }));

    this.onSearch();
  }

  get isAr(): boolean {
    return this.translationService.currentLanguage() === 'ar';
  }

  fetchReservations(payload: ReservationFilterDto | null = null) {
    this.isLoading = true;

    this.reservationReadService.getDetailedStatistics(payload).subscribe({
      next: (res: PagedResultDto<ReservationGridDto>) => {
        this.reservations = res.items;
        this.pageIndex = 0;
        this.totalRecords = res.totalCount;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching shomoos reservations:', err);
        this.isLoading = false;
      }
    });
  }


  onPageChange(event: any) {
    this.pageIndex = event.first / event.rows;
    this.pageSize = event.rows;
    this.onSearch();
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  onSearch() {
    const payload: ReservationFilterDto = {
      skipCount: this.pageIndex * this.pageSize,
      maxResultCount: this.pageSize,
      guestName: this.filterGuestName || undefined,
      property: this.filterPropertyName || undefined,
      identityType: this.filterGuestIdType || undefined,
      unitNumber: this.filterUnitNumber || undefined,
      identityNumber: this.filterIdNumber || undefined,
      fromDate: this.filterDateFrom ? this.formatDate(this.filterDateFrom) : undefined,
      toDate: this.filterDateTo ? this.formatDate(this.filterDateTo) : undefined
    };

    this.fetchReservations(payload);
  }

  clearFilters() {
    this.filterGuestName = null;
    this.filterPropertyName = null;
    this.filterGuestIdType = null;
    this.filterUnitNumber = null;
    this.filterIdNumber = null;
    this.filterDateFrom = null;
    this.filterDateTo = null;

    this.onSearch();
  }

  formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  getGuestIdTypeName(id: any): string {
    if (!id) return '-';
    const label = this.idTypesList.find(t => t.value === Number(id))?.label;
    if (label) {
      return this.translate.instant(label);
    }
    return id?.toString();
  }
}
