import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DashboardSummaryDto, ReservationReadService } from '@proxy/reservations';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-shmoos-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule, ButtonModule, CalendarModule, FormsModule, TranslateModule],
  providers: [DatePipe],
  templateUrl: './shmoos-dashboard.component.html',
  styleUrl: './shmoos-dashboard.component.scss'
})
export class ShmoosDashboardComponent implements OnInit {

  barData: any;
  barOptions: any;
  doughnutData: any;
  doughnutOptions: any;

  statsData: any = {
    reservations: 0,
    flagged: 0
  };

  rawCounts = {
    checkedIn: 0,
    checkedOut: 0,
    cancelled: 0
  };

  selectedDate: Date = new Date();
  isLoading = false;
  hasTodayData = true;
  hasBarData = true;

  recentLogs: any[] = [];

  constructor(
    private translationService: TranslationService,
    private reservationReadService: ReservationReadService
  ) { }


  ngOnInit() {
    this.initCharts();
    this.fetchStats();
  }

  get isAr(): boolean {
    return this.translationService.currentLanguage() === 'ar';
  }
  fetchStats() {
    this.isLoading = true;
    this.reservationReadService.getDashboard().subscribe({
      next: (res: DashboardSummaryDto) => {
        this.isLoading = false;
        this.updateCharts(res);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching shomoos statistics:', err);
      }
    });
  }

  onDateChange(event: any) {
    // When user changes date from the top right p-calendar
    this.fetchStats();
  }

  updateCharts(res: DashboardSummaryDto) {
    if (!res) return;

    if (res.totalReservations !== undefined) {
      this.statsData.reservations = res.totalReservations;
    }
    if (res.flaggedReservations !== undefined) {
      this.statsData.flagged = res.flaggedReservations;
    }

    // Bar Chart Update
    if (res.reservationsPerDay && Array.isArray(res.reservationsPerDay) && res.reservationsPerDay.length > 0) {
      this.hasBarData = true;
      const labels = res.reservationsPerDay.map((item: any) => item.day);
      const resData = res.reservationsPerDay.map((item: any) => item.count);

      const primaryColor = '#194E45';
      const secondaryColor = '#b9a779';
      const bgColors = resData.map((_, i) => (i % 2 === 0 ? primaryColor : secondaryColor));

      this.barData = {
        ...this.barData,
        labels: labels,
        datasets: [
          {
            ...this.barData.datasets[0],
            data: resData,
            backgroundColor: bgColors
          }
        ]
      };
    } else {
      this.hasBarData = false;
    }

    // Doughnut Chart Update
    const checkedIn = res.checkedIn || 0;
    const checkedOut = res.checkedOut || 0;
    const cancelled = res.cancelled || 0;

    this.rawCounts.checkedIn = checkedIn;
    this.rawCounts.checkedOut = checkedOut;
    this.rawCounts.cancelled = cancelled;

    const totalToday = checkedIn + checkedOut + cancelled;

    if (totalToday > 0) {
      this.hasTodayData = true;
    } else {
      this.hasTodayData = false;
    }

    this.doughnutData = {
      ...this.doughnutData,
      datasets: [
        {
          ...this.doughnutData.datasets[0],
          data: [checkedIn, checkedOut, cancelled]
        }
      ]
    };
  }

  initCharts() {
    // Theme colors from variables
    const primaryColor = '#194E45';
    const secondaryColor = '#b9a779';
    const dangerColor = '#BA1A1A';

    this.barData = {
      labels: [],
      datasets: [
        {
          label: 'Reservations',
          data: [],
          backgroundColor: [],
          borderRadius: 4,
          borderWidth: 0,
          barPercentage: 0.6
        }
      ]
    };

    this.barOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: { color: '#6B7280', font: { weight: 'bold', size: 10 } }
        },
        y: {
          display: false,
          grid: {
            display: false,
          },
          min: 0
        }
      }
    };

    this.doughnutData = {
      labels: ['Checked In', 'Checked Out', 'Cancelled'],
      datasets: [
        {
          data: [],
          backgroundColor: [
            primaryColor,    // Checked In
            secondaryColor,  // Checked Out
            dangerColor      // Cancelled
          ],
          hoverBackgroundColor: [
            primaryColor,
            secondaryColor,
            dangerColor
          ],
          borderWidth: 5,
          borderColor: '#ffffff'
        }
      ]
    };

    this.doughnutOptions = {
      cutout: '75%',
      plugins: {
        legend: {
          display: false
        }
      }
    };
  }

  getTotalDoughnutSum(): number {
    if (!this.doughnutData?.datasets?.[0]?.data) return 0;
    return this.doughnutData.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
  }
}

