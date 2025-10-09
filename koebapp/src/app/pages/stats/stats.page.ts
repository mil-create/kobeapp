import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  homeOutline,
  statsChartOutline,
  barbellOutline,
  cartOutline,
  personOutline,
  flameOutline,
  trendingUpOutline,
  timeOutline,
  footstepsOutline,
  heartOutline,
  waterOutline,
  medalOutline,
  chevronDownOutline,
  chevronUpOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class StatsPage implements OnInit {
  
  selectedPeriod = 'week';
  
  periods = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' }
  ];

  weeklyStats = {
    totalSteps: 48250,
    totalCalories: 3450,
    totalWorkouts: 5,
    totalMinutes: 240,
    activeStreak: 7,
    averageHeartRate: 142
  };

  // Weekly progress data for graph
  weeklyProgress = [
    { day: 'Mon', steps: 8500, calories: 580, workouts: 1, height: 85 },
    { day: 'Tue', steps: 7200, calories: 490, workouts: 1, height: 72 },
    { day: 'Wed', steps: 9100, calories: 620, workouts: 1, height: 91 },
    { day: 'Thu', steps: 6800, calories: 460, workouts: 1, height: 68 },
    { day: 'Fri', steps: 8900, calories: 610, workouts: 1, height: 89 },
    { day: 'Sat', steps: 4500, calories: 310, workouts: 0, height: 45 },
    { day: 'Sun', steps: 3250, calories: 380, workouts: 0, height: 33 }
  ];

  // Monthly comparison for trend
  monthlyTrend = [
    { label: 'Week 1', value: 35000 },
    { label: 'Week 2', value: 42000 },
    { label: 'Week 3', value: 48250 },
    { label: 'Week 4', value: 45000 }
  ];

  achievements = [
    { icon: '🔥', title: '7 Day Streak', progress: 100, earned: true },
    { icon: '🏃', title: '50K Steps', progress: 96, earned: false },
    { icon: '💪', title: '20 Workouts', progress: 75, earned: false },
    { icon: '⭐', title: 'Early Bird', progress: 40, earned: false }
  ];

  showWeeklyDetails = false;
  showTrendDetails = false;

  constructor(private router: Router) {
    addIcons({
      homeOutline,
      statsChartOutline,
      barbellOutline,
      cartOutline,
      personOutline,
      flameOutline,
      trendingUpOutline,
      timeOutline,
      footstepsOutline,
      heartOutline,
      waterOutline,
      medalOutline,
      chevronDownOutline,
      chevronUpOutline
    });
  }

  ngOnInit() {
    console.log('StatsPage initialized');
  }

  selectPeriod(periodId: string) {
    this.selectedPeriod = periodId;
    // Load different stats based on period
  }

  getMaxSteps(): number {
    return Math.max(...this.weeklyProgress.map(d => d.steps));
  }

  getBarHeight(steps: number): number {
    return (steps / this.getMaxSteps()) * 100;
  }

  toggleWeeklyDetails() {
    this.showWeeklyDetails = !this.showWeeklyDetails;
  }

  toggleTrendDetails() {
    this.showTrendDetails = !this.showTrendDetails;
  }

  getTrendPercentage(index: number): number {
    if (index === 0) return 0;
    const current = this.monthlyTrend[index].value;
    const previous = this.monthlyTrend[index - 1].value;
    return ((current - previous) / previous) * 100;
  }

  // Bottom Navigation
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToStats() {
    // Already on stats page
  }

  navigateToWorkouts() {
    this.router.navigate(['/workouts']);
  }

  navigateToMerch() {
    this.router.navigate(['/merch']);
  }

  navigateToAccount() {
    this.router.navigate(['/account']);
  }
}