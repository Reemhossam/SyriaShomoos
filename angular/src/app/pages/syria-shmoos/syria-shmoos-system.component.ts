import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ShmoosDetailedStatisticsComponent } from './detailed-statistics/shmoos-detailed-statistics.component';
import { ShmoosDashboardComponent } from './dashboard/shmoos-dashboard.component';
import { ShmoosConvictsComponent } from './convicts/shmoos-convicts.component';
import { AuthService } from '@abp/ng.core';

@Component({
  selector: 'app-syria-shmoos-system',
  standalone: true,
  imports: [CommonModule, SelectButtonModule, FormsModule, ShmoosDetailedStatisticsComponent, ShmoosDashboardComponent, ShmoosConvictsComponent],
  templateUrl: './syria-shmoos-system.component.html',
  styleUrl: './syria-shmoos-system.component.scss'
})
export class SyriaShmoosSystemComponent implements OnInit {
  viewOptions: any[] = [];
  selectedView: string = 'Detailed Statistics';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.viewOptions = [
      { label: 'Detailed Statistics', value: 'Detailed Statistics' },
      { label: 'Dashboard', value: 'Dashboard' },
      { label: 'Convicts', value: 'Convicts' }
    ];
  }

  logout() {
    this.authService.logout();
    this.authService.navigateToLogin()
  }
}
