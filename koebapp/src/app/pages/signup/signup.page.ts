import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SignupPage implements OnInit {
  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('SignupPage initialized');
  }

  handleSubmit() {
    console.log('Sign up form submitted:', this.formData);
    
    // Validation
    if (!this.formData.name || !this.formData.email || !this.formData.password) {
      alert('Please fill in all fields!');
      return;
    }
    
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (this.formData.password.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }
    
    alert('Sign up successful! Mamba Mentality activated.');
    // Navigate to sign in or home page
    // this.router.navigate(['/signin']);
  }

  goToSignIn() {
    this.router.navigate(['/signin']);
  }
}