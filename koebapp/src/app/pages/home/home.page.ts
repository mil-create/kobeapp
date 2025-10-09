import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  timeOutline, 
  chevronForward, 
  flameOutline,
  trophyOutline,
  barbellOutline,
  cartOutline,
  statsChartOutline,
  ellipsisHorizontal,
  homeOutline,
  personOutline
} from 'ionicons/icons';
import { Motion } from '@capacitor/motion';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomePage implements OnInit, OnDestroy {
  currentMonth = '';
  currentYear = '';
  weekDays: any[] = [];
  selectedDay = 0;
  today = new Date();
  
  dailyChallenge = {
    text: 'Do your plan before 6:00 PM',
    image: 'assets/images/challenge-runner.jpg'
  };

  stats = {
    steps: 0,
    stepsGoal: 10000,
    caloriesTarget: 1200,
    caloriesBurned: 0,
    caloriesRemaining: 1200
  };

  workouts = [
    {
      title: 'Lower body workout',
      duration: '30 mins',
      exercises: 'Cardio | Chest circuit / Glutes / Squats / Hamstrings',
      calories: 538,
      image: 'assets/images/lower-body.jpg'
    },
    {
      title: 'Upper body workout',
      duration: '28 mins',
      exercises: 'Strength training',
      calories: 425,
      image: 'assets/images/upper-body.jpg'
    }
  ];

  private motionListener: any;

  constructor(private router: Router) {
    addIcons({ 
      timeOutline, 
      chevronForward, 
      flameOutline,
      trophyOutline,
      barbellOutline,
      cartOutline,
      statsChartOutline,
      ellipsisHorizontal,
      homeOutline,
      personOutline
    });
  }

  ngOnInit() {
    console.log('HomePage initialized');
    this.initializeDate();
    this.initializeStepCounter();
    this.calculateCalories();
  }

  ngOnDestroy() {
    if (this.motionListener) {
      this.motionListener.remove();
    }
  }

  initializeDate() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    
    this.currentMonth = months[this.today.getMonth()];
    this.currentYear = this.today.getFullYear().toString();
    this.selectedDay = this.today.getDate();
    
    this.weekDays = this.getCurrentWeek();
  }

  getCurrentWeek() {
    const week = [];
    const currentDay = this.today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(this.today);
      date.setDate(this.today.getDate() + mondayOffset + i);
      
      week.push({
        label: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i],
        number: date.getDate(),
        fullDate: date,
        isToday: date.toDateString() === this.today.toDateString()
      });
    }
    
    return week;
  }

  async initializeStepCounter() {
    try {
      // Handle iOS-specific permission for motion sensors
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        const response = await (DeviceMotionEvent as any).requestPermission();
        if (response !== 'granted') {
          console.warn('Motion permission not granted');
          this.useDemoData();
          return;
        }
      }

      // Load stored steps for today
      const storedDate = localStorage.getItem('step_date');
      const todayString = this.today.toDateString();

      if (storedDate === todayString) {
        const storedSteps = localStorage.getItem('daily_steps');
        this.stats.steps = storedSteps ? parseInt(storedSteps, 10) : 0;
      } else {
        this.stats.steps = 0;
        localStorage.setItem('step_date', todayString);
        localStorage.setItem('daily_steps', '0');
      }

      // Listen to accelerometer for step detection
      this.motionListener = await Motion.addListener('accel', (event) => {
        this.detectStep(event.acceleration);
      });

      this.calculateCalories();
    } catch (error) {
      console.error('Motion sensor error:', error);
      this.useDemoData();
    }
  }


  private lastAcceleration = 0;
  private stepThreshold = 1.5;
  
  detectStep(acceleration: any) {
    // Simple step detection algorithm
    const magnitude = Math.sqrt(
      acceleration.x * acceleration.x +
      acceleration.y * acceleration.y +
      acceleration.z * acceleration.z
    );
    
    if (Math.abs(magnitude - this.lastAcceleration) > this.stepThreshold) {
      this.stats.steps++;
      localStorage.setItem('daily_steps', this.stats.steps.toString());
      this.calculateCalories();
    }
    
    this.lastAcceleration = magnitude;
  }

  useDemoData() {
    // For web testing
    const storedSteps = localStorage.getItem('demo_steps');
    this.stats.steps = storedSteps ? parseInt(storedSteps, 10) : 1940;
    this.calculateCalories();
    
    // Simulate steps in browser
    setInterval(() => {
      this.stats.steps += Math.floor(Math.random() * 10);
      localStorage.setItem('demo_steps', this.stats.steps.toString());
      this.calculateCalories();
    }, 5000);
  }

  calculateCalories() {
    const caloriesPerStep = 0.04;
    this.stats.caloriesBurned = Math.round(this.stats.steps * caloriesPerStep);
    this.stats.caloriesRemaining = Math.max(0, this.stats.caloriesTarget - this.stats.caloriesBurned);
  }

  startWorkout(workout: any) {
    console.log('Starting workout:', workout);
    alert(`Starting ${workout.title}! Mamba Mentality activated.`);
  }

  openSettings() {
    console.log('Open settings');
  }

  viewAllStats() {
    this.router.navigate(['/stats']);
  }

  selectDay(day: any) {
    this.selectedDay = day.number;
  }

  navigateToHome() {
    // Already on home
  }

  navigateToStats() {
    this.router.navigate(['/stats']);
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