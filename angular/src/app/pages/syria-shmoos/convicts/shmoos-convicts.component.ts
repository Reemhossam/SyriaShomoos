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

  pageSize = 7;
  pageIndex = 0;

  showFilter = false;

  // Filters
  filterGuestName: string | null = null;
  filterIdNumber: string | null = null;
  filterIdSerial: string | null = null;
  filterAddress: string | null = null;
  filterNationality: string | null = null;
  filterDateOfBirth: Date | null = null;

  ngOnInit() {

    this.allConvicts = [
      {
        guestName: 'Ahmed Emad',
        dateOfBirth: '22/10/1987',
        nationality: 'Egyptian',
        idNumber: '24344643221',
        idSerial: '23546431',
        address: 'Elseddik street, Cairo',
        isFlagged: false
      },
      {
        guestName: 'Mohamed Ali',
        dateOfBirth: '14/03/1990',
        nationality: 'Egyptian',
        idNumber: '24344643222',
        idSerial: '23546432',
        address: 'Tahrir street, Cairo',
        isFlagged: true
      },
      {
        guestName: 'Hassan Mahmoud',
        dateOfBirth: '05/07/1985',
        nationality: 'Egyptian',
        idNumber: '24344643223',
        idSerial: '23546433',
        address: 'Ramses street, Cairo',
        isFlagged: false
      },
      {
        guestName: 'Mahmoud Adel',
        dateOfBirth: '18/11/1992',
        nationality: 'Egyptian',
        idNumber: '24344643224',
        idSerial: '23546434',
        address: 'Nasr City, Cairo',
        isFlagged: true
      },
      {
        guestName: 'Omar Khaled',
        dateOfBirth: '02/01/1988',
        nationality: 'Egyptian',
        idNumber: '24344643225',
        idSerial: '23546435',
        address: 'Heliopolis, Cairo',
        isFlagged: false
      },
      {
        guestName: 'Karim Samy',
        dateOfBirth: '30/09/1991',
        nationality: 'Egyptian',
        idNumber: '24344643226',
        idSerial: '23546436',
        address: 'Maadi, Cairo',
        isFlagged: false
      },
      {
        guestName: 'Youssef Nader',
        dateOfBirth: '12/12/1986',
        nationality: 'Egyptian',
        idNumber: '24344643227',
        idSerial: '23546437',
        address: 'Dokki, Giza',
        isFlagged: true
      },
      {
        guestName: 'Tarek Ibrahim',
        dateOfBirth: '08/06/1989',
        nationality: 'Egyptian',
        idNumber: '24344643228',
        idSerial: '23546438',
        address: 'Mohandessin, Giza',
        isFlagged: false
      },
      {
        guestName: 'Mostafa Hany',
        dateOfBirth: '19/04/1993',
        nationality: 'Egyptian',
        idNumber: '24344643229',
        idSerial: '23546439',
        address: 'Faisal street, Giza',
        isFlagged: false
      },
      {
        guestName: 'Ali Fathy',
        dateOfBirth: '27/08/1984',
        nationality: 'Egyptian',
        idNumber: '24344643230',
        idSerial: '23546440',
        address: 'Haram street, Giza',
        isFlagged: true
      }
    ];

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
    this.filterIdNumber = null;
    this.filterIdSerial = null;
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
        (!this.filterIdNumber || c.idNumber.includes(this.filterIdNumber)) &&
        (!this.filterIdSerial || c.idSerial.includes(this.filterIdSerial)) &&
        (!this.filterAddress || c.address.toLowerCase().includes(this.filterAddress.toLowerCase())) &&
        (!this.filterNationality || c.nationality.toLowerCase().includes(this.filterNationality.toLowerCase()))
      );

    });

    this.pageIndex = 0;

    this.loadPage();
  }

}