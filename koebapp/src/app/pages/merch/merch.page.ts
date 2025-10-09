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
  arrowBackOutline,
  closeOutline,
  arrowForwardOutline,
  trashOutline,
  addOutline,
  removeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-cart',
  templateUrl: './merch.page.html',
  styleUrls: ['./merch.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class MerchPage implements OnInit {
  cartItems = [
    { 
      name: 'Black Gold', 
      price: 180, 
      image: 'assets/images/black-blue.png', 
      quantity: 1, 
      bgColor: '#2a2a2a' 
    },
    { 
      name: 'Gold Rush', 
      price: 200, 
      image: 'assets/images/gold.png', 
      quantity: 1, 
      bgColor: '#d0b101' 
    },
  ];

  total = 0;

  constructor(private router: Router) {
    addIcons({
      homeOutline,
      statsChartOutline,
      barbellOutline,
      cartOutline,
      personOutline,
      arrowBackOutline,
      closeOutline,
      arrowForwardOutline,
      trashOutline,
      addOutline,
      removeOutline
    });
  }

  ngOnInit() {
    this.calculateTotal();
    this.loadCart();
  }

  loadCart() {
    const savedCart = localStorage.getItem('cart_items');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.calculateTotal();
    }
  }

  saveCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.cartItems));
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.saveCart();
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.saveCart();
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  goBack() {
    this.router.navigate(['/merch']);
  }

  checkout() {
    console.log('Proceeding to checkout...');
    alert(`Total: $${(this.total + 15 + (this.total * 0.08)).toFixed(2)}\nThank you for shopping Mamba Merch! 🏀`);
    // Implement actual checkout logic here
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
    this.router.navigate(['/account']);
  }
}