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
  timeOutline,
  flameOutline,
  playCircleOutline,
  trophyOutline,
  checkmarkCircleOutline,
  chevronDownOutline,
  chevronUpOutline,
  closeCircleOutline,
  addCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class WorkoutsPage implements OnInit {
  
  selectedCategory = 'all';
  showCompletedWorkouts = false;
  
  categories = [
    { id: 'all', name: 'All', icon: '💪' },
    { id: 'strength', name: 'Strength', icon: '🏋️' },
    { id: 'cardio', name: 'Cardio', icon: '🏃' },
    { id: 'basketball', name: 'Basketball', icon: '🏀' },
    { id: 'flexibility', name: 'Flexibility', icon: '🧘' }
  ];

  todaysWorkouts = [
    {
      id: 1,
      title: 'Lower Body Power',
      subtitle: 'Leg day intensity',
      duration: 30,
      calories: 538,
      difficulty: 'Advanced',
      category: 'strength',
      exercises: [
        { name: 'Squats', sets: 4, reps: 12, completed: false },
        { name: 'Lunges', sets: 3, reps: 15, completed: false },
        { name: 'Deadlifts', sets: 4, reps: 10, completed: false },
        { name: 'Leg Press', sets: 3, reps: 12, completed: false }
      ],
      image: 'assets/images/lower-body-workout.jpg',
      isExpanded: false,
      inProgress: false,
      completed: false
    },
    {
      id: 2,
      title: 'Upper Body Strength',
      subtitle: 'Build championship power',
      duration: 28,
      calories: 425,
      difficulty: 'Intermediate',
      category: 'strength',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: 10, completed: false },
        { name: 'Pull-ups', sets: 3, reps: 12, completed: false },
        { name: 'Shoulder Press', sets: 4, reps: 10, completed: false },
        { name: 'Rows', sets: 3, reps: 12, completed: false }
      ],
      image: 'assets/images/upper-body-workout.jpg',
      isExpanded: false,
      inProgress: false,
      completed: false
    },
    {
      id: 3,
      title: 'Mamba HIIT',
      subtitle: 'High intensity cardio',
      duration: 20,
      calories: 380,
      difficulty: 'Advanced',
      category: 'cardio',
      exercises: [
        { name: 'Burpees', sets: 4, reps: 15, completed: false },
        { name: 'Mountain Climbers', sets: 4, reps: 20, completed: false },
        { name: 'Jump Squats', sets: 3, reps: 15, completed: false },
        { name: 'High Knees', sets: 4, reps: 30, completed: false }
      ],
      image: 'assets/images/hiit-workout.jpg',
      isExpanded: false,
      inProgress: false,
      completed: false
    }
  ];

  recommendedWorkouts = [
    {
      id: 4,
      title: 'Ball Handling Mastery',
      subtitle: 'Fundamentals drill',
      duration: 25,
      calories: 290,
      difficulty: 'All Levels',
      category: 'basketball',
      exercises: [
        { name: 'Crossovers', sets: 3, reps: 20, completed: false },
        { name: 'Between Legs', sets: 3, reps: 20, completed: false },
        { name: 'Behind Back', sets: 3, reps: 20, completed: false },
        { name: 'Spin Moves', sets: 3, reps: 15, completed: false }
      ],
      image: 'assets/images/basketball-drills.jpg',
      isExpanded: false,
      inProgress: false,
      completed: false
    },
    {
      id: 5,
      title: 'Shooting Excellence',
      subtitle: 'Perfect your shot',
      duration: 40,
      calories: 320,
      difficulty: 'All Levels',
      category: 'basketball',
      exercises: [
        { name: 'Free Throws', sets: 5, reps: 10, completed: false },
        { name: 'Mid-Range', sets: 4, reps: 15, completed: false },
        { name: '3-Pointers', sets: 4, reps: 10, completed: false },
        { name: 'Form Shooting', sets: 3, reps: 20, completed: false }
      ],
      image: 'assets/images/shooting-practice.jpg',
      isExpanded: false,
      inProgress: false,
      completed: false
    },
    {
      id: 6,
      title: 'Recovery Flow',
      subtitle: 'Active recovery',
      duration: 15,
      calories: 80,
      difficulty: 'Beginner',
      category: 'flexibility',
      exercises: [
        { name: 'Yoga Flow', sets: 1, reps: 1, completed: false },
        { name: 'Dynamic Stretching', sets: 1, reps: 1, completed: false },
        { name: 'Foam Rolling', sets: 1, reps: 1, completed: false },
        { name: 'Mobility Work', sets: 1, reps: 1, completed: false }
      ],
      image: 'assets/images/stretching.jpg',
      isExpanded: false,
      inProgress: false,
      completed: false
    }
  ];

  filteredWorkouts: any[] = [];
  filteredRecommended: any[] = [];

  // Quick stats
  quickStats = {
    todayCompleted: 0,
    todayTotal: 3,
    weeklyStreak: 5,
    totalCaloriesBurned: 0
  };

  constructor(private router: Router) {
    addIcons({
      homeOutline,
      statsChartOutline,
      barbellOutline,
      cartOutline,
      personOutline,
      timeOutline,
      flameOutline,
      playCircleOutline,
      trophyOutline,
      checkmarkCircleOutline,
      chevronDownOutline,
      chevronUpOutline,
      closeCircleOutline,
      addCircleOutline
    });
  }

  ngOnInit() {
    console.log('WorkoutsPage initialized');
    this.filterWorkouts();
    this.loadProgress();
  }

  loadProgress() {
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem('workout_progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      this.todaysWorkouts.forEach(workout => {
        const saved = progress.find((w: any) => w.id === workout.id);
        if (saved) {
          workout.completed = saved.completed;
          workout.inProgress = saved.inProgress;
          workout.exercises = saved.exercises;
        }
      });
      this.updateQuickStats();
    }
  }

  saveProgress() {
    const progress = this.todaysWorkouts.map(w => ({
      id: w.id,
      completed: w.completed,
      inProgress: w.inProgress,
      exercises: w.exercises
    }));
    localStorage.setItem('workout_progress', JSON.stringify(progress));
    this.updateQuickStats();
  }

  updateQuickStats() {
    this.quickStats.todayCompleted = this.todaysWorkouts.filter(w => w.completed).length;
    this.quickStats.totalCaloriesBurned = this.todaysWorkouts
      .filter(w => w.completed)
      .reduce((sum, w) => sum + w.calories, 0);
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.filterWorkouts();
  }

  filterWorkouts() {
    if (this.selectedCategory === 'all') {
      this.filteredWorkouts = this.todaysWorkouts;
      this.filteredRecommended = this.recommendedWorkouts;
    } else {
      this.filteredWorkouts = this.todaysWorkouts.filter(
        workout => workout.category === this.selectedCategory
      );
      this.filteredRecommended = this.recommendedWorkouts.filter(
        workout => workout.category === this.selectedCategory
      );
    }
  }

  toggleWorkoutDetails(workout: any) {
    workout.isExpanded = !workout.isExpanded;
  }

  startWorkout(workout: any) {
    workout.inProgress = true;
    workout.completed = false;
    this.saveProgress();
    console.log('Starting workout:', workout.title);
  }

  completeWorkout(workout: any) {
    workout.completed = true;
    workout.inProgress = false;
    workout.exercises.forEach((ex: any) => ex.completed = true);
    this.saveProgress();
    alert(`${workout.title} completed! 🏆 You earned ${workout.calories} calories!`);
  }

  toggleExercise(workout: any, exercise: any) {
    exercise.completed = !exercise.completed;
    
    // Check if all exercises are completed
    const allCompleted = workout.exercises.every((ex: any) => ex.completed);
    if (allCompleted) {
      workout.completed = true;
      workout.inProgress = false;
    }
    
    this.saveProgress();
  }

  cancelWorkout(workout: any) {
    workout.inProgress = false;
    workout.exercises.forEach((ex: any) => ex.completed = false);
    this.saveProgress();
  }

  getDifficultyColor(difficulty: string): string {
    switch(difficulty.toLowerCase()) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#FDB927';
      case 'advanced': return '#ef4444';
      default: return '#999';
    }
  }

  getProgressPercentage(workout: any): number {
    const completed = workout.exercises.filter((ex: any) => ex.completed).length;
    return (completed / workout.exercises.length) * 100;
  }

  toggleCompletedWorkouts() {
    this.showCompletedWorkouts = !this.showCompletedWorkouts;
  }

  // Bottom Navigation
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToStats() {
    this.router.navigate(['/stats']);
  }

  navigateToWorkouts() {
    // Already on workouts page
  }

  navigateToMerch() {
    this.router.navigate(['/merch']);
  }

  navigateToAccount() {
    this.router.navigate(['/account']);
  }
}