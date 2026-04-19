import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ReservationGridDto, ReservationReadService } from '@proxy/reservations';

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
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule, SelectModule, DatePickerModule],
  templateUrl: './shmoos-detailed-statistics.component.html',
  styleUrl: './shmoos-detailed-statistics.component.scss'
})
export class ShmoosDetailedStatisticsComponent implements OnInit {
  reservationReadService = inject(ReservationReadService);

  showFilter = true;
  reservations: ReservationGridDto[] = [];
  totalRecords = 0;
  isLoading = false;

  pageSize = 7;
  pageIndex = 0;

  idTypesList: any[] = [];

  // API Filters
  filterGuestName: string | null = null;
  filterPropertyName: string | null = null;
  filterGuestIdType: number | null = null;
  filterUnitNumber: string | null = null;
  filterIdNumber: string | null = null;
  filterDateFrom: Date | null = null;
  filterDateTo: Date | null = null;

  ngOnInit() {
    this.idTypesList = Object.keys(GuestIdType)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        label: key.replace(/([A-Z])/g, ' $1').trim(),
        value: GuestIdType[key as keyof typeof GuestIdType]
      }));

    this.fetchReservations();
  }

  fetchReservations() {
    this.isLoading = true;

    const payload = {
      paging: {
        pagingEnabled: true,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        totalCount: 0,
        subTotalCount: 0,
        skip: this.pageIndex * this.pageSize
      },
      orderByDirection: 1,
      orderByCultureMode: 1,
      // Attached to Search UI
      guestName: this.filterGuestName || null,
      propertyName: this.filterPropertyName || null,
      guestIdType: this.filterGuestIdType || null,
      unitNumber: this.filterUnitNumber || null,
      idNumber: this.filterIdNumber || null,
      dateFrom: this.filterDateFrom ? this.formatDate(this.filterDateFrom) : null,
      dateTo: this.filterDateTo ? this.formatDate(this.filterDateTo) : null
    };
// payload to get with filters and pagination

    this.reservationReadService.getList().subscribe({
      next: (res: ReservationGridDto[]) => {
        // console.log('Real Shomoos API Data:', res);
        this.reservations = res || [];
        
        if (this.reservations.length === 0) {
          const mockItems: any[] = [];
          for (let i = 1; i <= 5; i++) {
            mockItems.push({
              fullName: `Mock Guest ${i}`,
              guestNationality: 'Syrian',
              guestParentName: `Parent ${i}`,
              guestDateOfBirth: '1990-01-01',
              guestAddress: 'Damascus, Syria',
              identityType: 1,
              identityNum: `9876543210${i}`,
              propertyName: `Mock Hotel ${i}`,
              city: 'Damascus',
              floor: `0${i}`,
              roomNumber: `${i}0${i}`,
              checkInDate: new Date().toISOString(),
              checkOutDate: new Date().toISOString(),
              actualCheckInDate: new Date().toISOString(),
              actualCheckOutDate: new Date().toISOString(),
              escortsCount: 0
            });
          }
          this.reservations = mockItems as ReservationGridDto[];
        }

        this.totalRecords = this.reservations.length;
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
    this.fetchReservations();
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  onSearch() {
    this.pageIndex = 0;
    this.fetchReservations();
  }

  clearFilters() {
    this.filterGuestName = null;
    this.filterPropertyName = null;
    this.filterGuestIdType = null;
    this.filterUnitNumber = null;
    this.filterIdNumber = null;
    this.filterDateFrom = null;
    this.filterDateTo = null;
    this.pageIndex = 0;
    this.fetchReservations();
  }

  formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  getGuestIdTypeName(id: any): string {
    if (!id) return '-';
    // Handle both numbers and strings for safety
    return this.idTypesList.find(t => t.value === Number(id))?.label || id?.toString();
  }
}
