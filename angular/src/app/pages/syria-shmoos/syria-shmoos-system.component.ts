import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ShmoosDetailedStatisticsComponent } from './detailed-statistics/shmoos-detailed-statistics.component';
import { ShmoosDashboardComponent } from './dashboard/shmoos-dashboard.component';
import { ShmoosConvictsComponent } from './convicts/shmoos-convicts.component';
import { AuthService } from '@abp/ng.core';
import { TranslationService } from '../../shared/services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-syria-shmoos-system',
  standalone: true,
  imports: [CommonModule, SelectButtonModule, FormsModule, ShmoosDetailedStatisticsComponent, ShmoosDashboardComponent, ShmoosConvictsComponent, TranslateModule],
  templateUrl: './syria-shmoos-system.component.html',
  styleUrl: './syria-shmoos-system.component.scss'
})
export class SyriaShmoosSystemComponent implements OnInit {
  viewOptions: any[] = [];
  selectedView: string = 'Detailed Statistics';
  showLangDropdown = false;

  constructor(
    private authService: AuthService, 
    public translationService: TranslationService,
    private translate: TranslateService,
    private el: ElementRef
  ) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showLangDropdown = false;
    }
  }

  ngOnInit() {
    this.updateViewOptions();
    // Re-populate options whenever language changes
    this.translate.onLangChange.subscribe(() => {
      this.updateViewOptions();
    });
  }

  private updateViewOptions() {
    this.translate.get(['SYSTEM.DETAILED_STATS', 'SYSTEM.DASHBOARD', 'SYSTEM.CONVICTS']).subscribe(translations => {
      this.viewOptions = [
        { label: translations['SYSTEM.DETAILED_STATS'], value: 'Detailed Statistics' },
        { label: translations['SYSTEM.DASHBOARD'], value: 'Dashboard' },
        { label: translations['SYSTEM.CONVICTS'], value: 'Convicts' }
      ];
    });
  }

  toggleLangDropdown() {
    this.showLangDropdown = !this.showLangDropdown;
  }

  selectLanguage(lang: string) {
    if (this.translationService.currentLanguage() !== lang) {
      this.translationService.setLanguage(lang);
    }
    this.showLangDropdown = false;
  }

  logout() {
    this.authService.logout();
    this.authService.navigateToLogin()
  }
}
