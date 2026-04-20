import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ConvictFilterDto, ConvictGridDto, ReservationReadService } from '@proxy/reservations';

@Component({
  selector: 'app-shmoos-convicts',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DatePickerModule
  ],
  templateUrl: './shmoos-convicts.component.html',
  styleUrl: './shmoos-convicts.component.scss'
})
export class ShmoosConvictsComponent implements OnInit {

  convicts: ConvictGridDto[] = [];
  allConvicts: ConvictGridDto[] = [];

  totalRecords = 0;
  isLoading = false;

  pageSize = 6;
  pageIndex = 0;

  showFilter = true; // Show filter by default as in design

  // Filters
  filterGuestName: string | null = null;
  filterHotelName: string | null = null;
  filterIdNumber: string | null = null;
  filterReservation: string | null = null;
  filterAddress: string | null = null;
  filterNationality: string | null = null;
  filterDateOfBirth: Date | null = null;

  constructor(private reservationReadService: ReservationReadService) {}

  ngOnInit() {
    this.getConvicts();
  }

  getConvicts(filter: ConvictFilterDto = {}) {
    this.isLoading = true;
    this.reservationReadService.getConvicts(filter).subscribe({
      next: (res: ConvictGridDto[]) => {
        if (res.length === 0) {
          // Add 5 mock data if response is empty
          this.allConvicts = [
            {
              fullName: 'Ahmad Al-Mansour',
              hotelName: 'Four Seasons Damascus',
              dateOfBirth: '12/05/1984',
              nationality: 'Syrian',
              idNumber: '01020039485',
              reservationNumber: '#99281',
              address: 'Mazzeh West Villas, Damascus',
              note: 'Requires Review'
            },
            {
              fullName: 'Samir Kabbani',
              hotelName: 'Sheraton Aleppo',
              dateOfBirth: '25/08/1976',
              nationality: 'Syrian',
              idNumber: '02048572931',
              reservationNumber: '#88372',
              address: 'Al-Jamiliyah Street, Aleppo'
            },
            {
              fullName: 'Omar Hadid',
              hotelName: 'Blue Tower Hotel',
              dateOfBirth: '03/11/1992',
              nationality: 'Lebanese',
              idNumber: 'LB-9920182',
              reservationNumber: '#10293',
              address: 'Hamra Street, Beirut',
              note: 'VIP Guest'
            },
            {
              fullName: 'Layla Yassin',
              hotelName: 'Dama Rose Hotel',
              dateOfBirth: '19/02/1988',
              nationality: 'Syrian',
              idNumber: '01044392011',
              reservationNumber: '#44521',
              address: 'Abu Rummaneh, Damascus'
            },
            {
              fullName: 'Khalid Al-Omar',
              hotelName: 'Tishreen Hotel',
              dateOfBirth: '30/06/1980',
              nationality: 'Jordanian',
              idNumber: 'JO-2283910',
              reservationNumber: '#33091',
              address: 'Amman, Jordan'
            }
          ];
        } else {
          this.allConvicts = res;
        }

        this.pageIndex = 0;
        this.totalRecords = this.allConvicts.length;
        this.loadPage();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching convicts:', err);
      }
    });
  }

  loadPage() {

    this.isLoading = true;

    setTimeout(() => {

      const start = this.pageIndex * this.pageSize;
      const end = start + this.pageSize;

      this.convicts = this.allConvicts.slice(start, end);

      this.totalRecords = this.allConvicts.length;

      this.isLoading = false;

    }, 400);
  }

  onPageChange(event: any) {

    this.pageIndex = event.first / event.rows;
    this.pageSize = event.rows;

    this.loadPage();
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  clearFilters() {

    this.filterGuestName = null;
    this.filterHotelName = null;
    this.filterIdNumber = null;
    this.filterReservation = null;
    this.filterAddress = null;
    this.filterNationality = null;
    this.filterDateOfBirth = null;

    this.getConvicts();
  }

  onSearch() {
    let formattedDate = undefined;
    if (this.filterDateOfBirth) {
      const d = new Date(this.filterDateOfBirth);
      // Create an ISO string for the date part
      formattedDate = d.toISOString().split('T')[0];
    }

    const filter: ConvictFilterDto = {
      guestName: this.filterGuestName || undefined,
      hotelName: this.filterHotelName || undefined,
      idNumber: this.filterIdNumber || undefined,
      reservationNumber: this.filterReservation || undefined,
      address: this.filterAddress || undefined,
      nationality: this.filterNationality || undefined,
      dateOfBirth: formattedDate
    };

    this.getConvicts(filter);
  }

}