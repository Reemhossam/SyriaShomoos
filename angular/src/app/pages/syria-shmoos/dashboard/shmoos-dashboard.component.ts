import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ReservationReadService } from '@proxy/reservations';

@Component({
  selector: 'app-shmoos-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule, ButtonModule, CalendarModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './shmoos-dashboard.component.html',
  styleUrl: './shmoos-dashboard.component.scss'
})
export class ShmoosDashboardComponent implements OnInit {
  reservationReadService = inject(ReservationReadService);

  barData: any;
  barOptions: any;
  doughnutData: any;
  doughnutOptions: any;

  statsData: any = {
    reservations: 24,
    flagged: 3
  };

  percentages = {
    checkedIn: 0,
    checkedOut: 0,
    cancelled: 0
  };
  
  rawCounts = {
    checkedIn: 15,
    checkedOut: 6,
    cancelled: 3
  };

  selectedDate: Date = new Date();
  isLoading = false;
  hasTodayData = true; // defaulting to true since we want to show dummy layout
  
  recentLogs: any[] = [];

  ngOnInit() {
    this.selectedDate = new Date('2026-05-12T00:00:00'); // match dummy layout
    this.initCharts();
    this.fetchStats();
  }

  fetchStats() {
    this.isLoading = true;
    this.reservationReadService.getList().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.updateCharts(res);
        this.checkAndMockData(res);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching shomoos statistics:', err);
        // Fallback to mock data on error
        this.checkAndMockData({ data: null, items: [] });
      }
    });
  }

  checkAndMockData(res: any) {
    // If reservations dataset is empty or undefined, populate 5 mock results
    if (!res || !res.items || res.items.length === 0) {
      this.recentLogs = [
        { timestamp: '2026-05-12 14:32:01', action: 'Database Export', user: 'Admin_S_Al-Masri', status: 'SUCCESS' },
        { timestamp: '2026-05-12 14:15:44', action: 'Profile Update', user: 'User_K_Haddad', status: 'SUCCESS' },
        { timestamp: '2026-05-12 13:58:12', action: 'Login Attempt', user: 'Unknown_IP_82.x', status: 'BLOCKED' },
        { timestamp: '2026-05-12 13:40:05', action: 'Policy Override', user: 'System_Kernel', status: 'SUCCESS' },
        { timestamp: '2026-05-12 13:15:22', action: 'Settings Change', user: 'Admin_S_Al-Masri', status: 'SUCCESS' }
      ];
    } else {
      // Logic for real data if available (we will map to our logs visual for now)
      this.recentLogs = [
        { timestamp: '2026-05-12 14:32:01', action: 'Database Export', user: 'Admin_S_Al-Masri', status: 'SUCCESS' },
        { timestamp: '2026-05-12 14:15:44', action: 'Profile Update', user: 'User_K_Haddad', status: 'SUCCESS' },
        { timestamp: '2026-05-12 13:58:12', action: 'Login Attempt', user: 'Unknown_IP_82.x', status: 'BLOCKED' },
        { timestamp: '2026-05-12 13:40:05', action: 'Policy Override', user: 'System_Kernel', status: 'SUCCESS' },
        { timestamp: '2026-05-12 13:15:22', action: 'Settings Change', user: 'Admin_S_Al-Masri', status: 'SUCCESS' }
      ];
    }
  }

  onDateChange(event: any) {
    // When user changes date from the top right p-calendar
    this.fetchStats();
  }

  updateCharts(res: any) {
    if (!res || !res.data) return;
    const data = res.data;

    if (data.totalCountWeekly !== undefined) {
      this.statsData.reservations = data.totalCountWeekly;
    }
    
    // Bar Chart Update
    if (data.weeklyReservationCounts && Array.isArray(data.weeklyReservationCounts) && data.weeklyReservationCounts.length > 0) {
      const labels = data.weeklyReservationCounts.map((item: any) => item.dayName);
      const resData = data.weeklyReservationCounts.map((item: any) => item.count);
      
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
    }

    // Doughnut Chart Update
    if (data.todayReservationStatusCount) {
      const checkedIn = data.todayReservationStatusCount.checkInStatusCount || 0;
      const checkedOut = data.todayReservationStatusCount.checkOutStatusCount || 0;
      const cancelled = data.todayReservationStatusCount.canceledStatusCount || 0;
      
      this.rawCounts.checkedIn = checkedIn;
      this.rawCounts.checkedOut = checkedOut;
      this.rawCounts.cancelled = cancelled;

      const totalToday = checkedIn + checkedOut + cancelled;
      
      if (totalToday > 0) {
        this.percentages.checkedIn = Math.round((checkedIn / totalToday) * 100);
        this.percentages.checkedOut = Math.round((checkedOut / totalToday) * 100);
        this.percentages.cancelled = Math.round((cancelled / totalToday) * 100);
        this.hasTodayData = true;
      } else {
        // keeping dummy layout visibility even without data, but reset percentages if needed
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
    // Theme colors from variables
    const primaryColor = '#194E45';
    const secondaryColor = '#b9a779';
    const dangerColor = '#BA1A1A';

    this.barData = {
      labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      datasets: [
        {
          label: 'Reservations',
          data: [68, 96, 30, 90, 110, 45, 60],
          backgroundColor: [
            primaryColor, primaryColor, secondaryColor, primaryColor, primaryColor, secondaryColor, primaryColor
          ],
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
          data: [15, 6, 3],
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

