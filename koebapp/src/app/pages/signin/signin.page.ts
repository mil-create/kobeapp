import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SigninPage implements OnInit {
  isSignUp = false;
  formData = {
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('SigninPage initialized');
  }

  handleSubmit() {
    console.log('Form submitted:', this.formData);
    
    if (this.isSignUp) {
      // Sign up logic
      if (this.formData.password !== this.formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      alert('Sign up successful! Mamba Mentality activated. 🏀');
    } else {
      // Sign in logic
      alert('Welcome back, Champion! 🏆');
    }
  }

  toggleAuthMode() {
    this.isSignUp = !this.isSignUp;
    // Reset form when switching
    this.formData = {
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    };
  }
}