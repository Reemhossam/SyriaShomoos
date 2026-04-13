import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { SyriaStatsService } from '../../syria-shmoos/syria-stats.service';

@Component({
  selector: 'app-shmoos-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule, ButtonModule],
  providers: [DatePipe],
  templateUrl: './shmoos-dashboard.component.html',
  styleUrl: './shmoos-dashboard.component.scss'
})
export class ShmoosDashboardComponent implements OnInit {
  statsService = inject(SyriaStatsService);

  lineData: any;
  lineOptions: any;
  doughnutData: any;
  doughnutOptions: any;

  statsData: any = {
    reservations: 0,
    flagged: 0
  };

  percentages = {
    checkedIn: 0,
    checkedOut: 0,
    cancelled: 0
  };

  todayDate: Date = new Date();
  isLoading = false;
  hasTodayData = false;

  ngOnInit() {
    this.initCharts();
    this.fetchStats();
  }

  fetchStats() {
    this.isLoading = true;
    this.statsService.getSyriaShomoosStatisticsReservations().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.updateCharts(res);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching shomoos statistics:', err);
      }
    });
  }

  updateCharts(res: any) {
    if (!res || !res.data) return;
    const data = res.data;

    this.statsData.reservations = data.totalCountWeekly ?? 0;
    
    // Line Chart Update
    if (data.weeklyReservationCounts && Array.isArray(data.weeklyReservationCounts)) {
      const labels = data.weeklyReservationCounts.map((item: any) => item.dayName);
      const resData = data.weeklyReservationCounts.map((item: any) => item.count);
      
      // Mock Flagged data based on Reservations Data
      const flaggedData = resData.map((count: number) => count > 0 ? Math.floor(Math.random() * count) : 0);
      
      // Calculate total flagged
      this.statsData.flagged = flaggedData.reduce((a: number, b: number) => a + b, 0);

      this.lineData = {
        ...this.lineData,
        labels: labels,
        datasets: [
          {
            ...this.lineData.datasets[0],
            data: resData
          },
          {
            ...this.lineData.datasets[1],
            data: flaggedData
          }
        ]
      };
    }

    // Doughnut Chart Update
    if (data.todayReservationStatusCount) {
      const checkedIn = data.todayReservationStatusCount.checkInStatusCount || 0;
      const checkedOut = data.todayReservationStatusCount.checkOutStatusCount || 0;
      const cancelled = data.todayReservationStatusCount.canceledStatusCount || 0;
      
      const totalToday = checkedIn + checkedOut + cancelled;
      
      if (totalToday > 0) {
        this.percentages.checkedIn = Math.round((checkedIn / totalToday) * 100);
        this.percentages.checkedOut = Math.round((checkedOut / totalToday) * 100);
        this.percentages.cancelled = Math.round((cancelled / totalToday) * 100);
        this.hasTodayData = true;
      } else {
        this.percentages = { checkedIn: 0, checkedOut: 0, cancelled: 0 };
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
  }

  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);

    // Theme 2 colors
    const primaryColor = '#85A95D'; // light green line & area
    const darkColor = '#3F4F2C';    // dark green
    const lightestGreen = '#E5F2D0'; // flagged background

    this.lineData = {
      labels: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      datasets: [
        {
          label: 'Reservations',
          data: [68, 96, 30, 90, 10, 60, 50],
          fill: true,
          borderColor: primaryColor,
          backgroundColor: 'rgba(133, 169, 93, 0.2)', // Light primary color for fill
          tension: 0.4,
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          pointHoverBackgroundColor: primaryColor
        },
        {
          label: 'Flagged',
          data: [30, 50, 10, 20, 10, 20, 10],
          fill: false,
          borderColor: primaryColor,
          borderDash: [5, 5],
          tension: 0.4,
          pointBackgroundColor: darkColor,
          pointBorderColor: darkColor,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };

    this.lineOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            color: '#f1f5f9',
            drawBorder: false
          },
          ticks: { color: '#94a3b8' }
        },
        y: {
          grid: {
            color: '#f1f5f9',
            drawBorder: false
          },
          ticks: {
            color: '#94a3b8'
          },
          min: 0
        }
      }
    };

    this.doughnutData = {
      labels: ['Checked In', 'Checked Out', 'Cancelled'],
      datasets: [
        {
          data: [36, 42, 22],
          backgroundColor: [
            darkColor,       // Checked In: dark green #3F4F2C
            primaryColor,    // Checked Out: normal green #85A95D
            lightestGreen    // Cancelled: faintest green #E5F2D0
          ],
          hoverBackgroundColor: [
            darkColor,
            primaryColor,
            lightestGreen
          ],
          borderWidth: 0
        }
      ]
    };

    this.doughnutOptions = {
      cutout: '65%',
      plugins: {
        legend: {
          display: false
        }
      }
    };
  }
}
