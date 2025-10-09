import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss']
})
export class LoaderPage {
  showLoading = false;
  displayText = '';
  fullText = 'Loading...';
  textIndex = 0;
  intervalId: any;

  constructor(private router: Router) {}

  startLoading() {
    this.showLoading = true;
    this.textIndex = 0;
    this.displayText = '';
    this.animateText();

    // Wait 6.5 seconds before stopping the animation and redirecting
    setTimeout(() => {
      this.stopLoading();
      this.router.navigateByUrl('/signin'); // redirect to sign-in page
    }, 3500);
  }

  animateText() {
    this.intervalId = setInterval(() => {
      this.textIndex++;
      this.displayText = this.fullText.substring(0, this.textIndex);
      if (this.textIndex >= this.fullText.length) {
        this.textIndex = 0;
        this.displayText = '';
      }
    }, 200);
  }

  stopLoading() {
    clearInterval(this.intervalId);
    this.showLoading = false;
    this.displayText = '';
  }
}
