import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

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

  convicts: any[] = [];
  allConvicts: any[] = [];
  filteredConvicts: any[] = [];

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

  ngOnInit() {

    this.allConvicts = [
      {
        guestName: 'Ahmad Al-Mansour',
        hotelName: 'Four Seasons Damascus',
        dateOfBirth: '12/05/1984',
        nationality: 'Syrian',
        idNumber: '01020039485',
        reservation: '#99281',
        address: 'Mazzeh West Villas, Damascus',
        hasReview: true
      },
      {
        guestName: 'Samir Kabbani',
        hotelName: 'Sheraton Aleppo',
        dateOfBirth: '25/08/1976',
        nationality: 'Syrian',
        idNumber: '02048572931',
        reservation: '#88372',
        address: 'Al-Jamiliyah Street, Aleppo',
        hasReview: false
      },
      {
        guestName: 'Omar Hadid',
        hotelName: 'Blue Tower Hotel',
        dateOfBirth: '03/11/1992',
        nationality: 'Lebanese',
        idNumber: 'LB-9920182',
        reservation: '#10293',
        address: 'Hamra Street, Beirut',
        hasReview: true
      },
      {
        guestName: 'Layla Yassin',
        hotelName: 'Dama Rose Hotel',
        dateOfBirth: '19/02/1988',
        nationality: 'Syrian',
        idNumber: '01044392011',
        reservation: '#44521',
        address: 'Abu Rummaneh, Damascus',
        hasReview: false
      },
      {
        guestName: 'Khalid Al-Omar',
        hotelName: 'Tishreen Hotel',
        dateOfBirth: '30/06/1980',
        nationality: 'Jordanian',
        idNumber: 'JO-2283910',
        reservation: '#33091',
        address: 'Amman, Jordan',
        hasReview: false
      },
      {
        guestName: 'Mariam Saleh',
        hotelName: 'Safir Hotel Homs',
        dateOfBirth: '14/12/1995',
        nationality: 'Syrian',
        idNumber: '04022938475',
        reservation: '#55283',
        address: 'Inshaat District, Homs',
        hasReview: false
      }
    ];

    this.filteredConvicts = [...this.allConvicts];
    // Adding multiple items to test pagination
    for (let i = 0; i < 20; i++) {
        this.allConvicts.push({
            guestName: 'Test Convict ' + i,
            hotelName: 'Test Hotel ' + i,
            dateOfBirth: '01/01/1990',
            nationality: 'Syrian',
            idNumber: '0000000000' + i,
            reservation: '#1000' + i,
            address: 'Test Address ' + i,
            hasReview: i % 2 === 0
        });
    }
    
    this.filteredConvicts = [...this.allConvicts];
    this.totalRecords = this.filteredConvicts.length;

    this.loadPage();
  }

  loadPage() {

    this.isLoading = true;

    setTimeout(() => {

      const start = this.pageIndex * this.pageSize;
      const end = start + this.pageSize;

      this.convicts = this.filteredConvicts.slice(start, end);

      this.totalRecords = this.filteredConvicts.length;

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

    this.filteredConvicts = [...this.allConvicts];

    this.pageIndex = 0;

    this.loadPage();
  }

  onSearch() {

    this.filteredConvicts = this.allConvicts.filter(c => {

      return (
        (!this.filterGuestName || c.guestName.toLowerCase().includes(this.filterGuestName.toLowerCase())) &&
        (!this.filterHotelName || c.hotelName.toLowerCase().includes(this.filterHotelName.toLowerCase())) &&
        (!this.filterIdNumber || c.idNumber.includes(this.filterIdNumber)) &&
        (!this.filterReservation || c.reservation.includes(this.filterReservation)) &&
        (!this.filterAddress || c.address.toLowerCase().includes(this.filterAddress.toLowerCase())) &&
        (!this.filterNationality || c.nationality.toLowerCase().includes(this.filterNationality.toLowerCase()))
      );

    });

    this.pageIndex = 0;

    this.loadPage();
  }

}