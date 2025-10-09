import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  personOutline,
  mailOutline,
  lockClosedOutline,
  notificationsOutline,
  moonOutline,
  languageOutline,
  helpCircleOutline,
  informationCircleOutline,
  logOutOutline,
  chevronForward,
  homeOutline,
  statsChartOutline,
  barbellOutline,
  cartOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AccountPage implements OnInit {
  user = {
    name: 'Kobe Bryant',
    email: 'mamba@lakers.com',
    // Image path: src/assets/images/profile-avatar.jpg
    avatar: 'assets/images/profile-avatar.jpg'
  };

  darkMode = false;
  notifications = true;

  constructor(private router: Router) {
    addIcons({
      personOutline,
      mailOutline,
      lockClosedOutline,
      notificationsOutline,
      moonOutline,
      languageOutline,
      helpCircleOutline,
      informationCircleOutline,
      logOutOutline,
      chevronForward,
      homeOutline,
      statsChartOutline,
      barbellOutline,
      cartOutline
    });
  }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const storedName = localStorage.getItem('user_name');
    const storedEmail = localStorage.getItem('user_email');
    if (storedName) this.user.name = storedName;
    if (storedEmail) this.user.email = storedEmail;
  }

  editProfile() {
    console.log('Edit profile');
  }

  changePassword() {
    console.log('Change password');
  }

  toggleNotifications() {
    this.notifications = !this.notifications;
    localStorage.setItem('notifications', this.notifications.toString());
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    localStorage.setItem('darkMode', this.darkMode.toString());
  }

  changeLanguage() {
    console.log('Change language');
  }

  getHelp() {
    console.log('Get help');
  }

  aboutApp() {
    console.log('About app');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/signin']);
  }

  // Bottom Navigation
  navigateToHome() {
    this.router.navigate(['/home']);
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
    // Already on account page
  }
}