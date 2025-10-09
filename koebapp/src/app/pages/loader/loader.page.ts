import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowForwardOutline } from 'ionicons/icons';

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
  subText = '';
  progressStep = 0;

  transformationPhrases = [
    {
      main: 'Shedding the old you...',
      sub: 'The Black Mamba awakens'
    },
    {
      main: 'New skin, new strength...',
      sub: 'Transformation in progress'
    },
    {
      main: 'Rising from within...',
      sub: 'Your journey begins now'
    },
    {
      main: 'Unleashing your power...',
      sub: 'Mamba Mentality activated'
    }
  ];

  currentPhraseIndex = 0;
  intervalId: any;

  constructor(private router: Router) {
    addIcons({ arrowForwardOutline });
  }

  startLoading() {
    this.showLoading = true;
    this.currentPhraseIndex = 0;
    this.progressStep = 0;
    this.updatePhrase();
    this.animateText();

    // Navigate after animation completes (4 seconds)
    setTimeout(() => {
      this.stopLoading();
      this.router.navigateByUrl('/signin');
    }, 4000);
  }

  animateText() {
    // Change phrase every 1 second
    this.intervalId = setInterval(() => {
      this.currentPhraseIndex++;
      this.progressStep++;
      
      if (this.currentPhraseIndex < this.transformationPhrases.length) {
        this.updatePhrase();
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  updatePhrase() {
    const phrase = this.transformationPhrases[this.currentPhraseIndex];
    this.displayText = phrase.main;
    this.subText = phrase.sub;
  }

  stopLoading() {
    clearInterval(this.intervalId);
    this.showLoading = false;
    this.displayText = '';
    this.subText = '';
    this.progressStep = 0;
  }
}