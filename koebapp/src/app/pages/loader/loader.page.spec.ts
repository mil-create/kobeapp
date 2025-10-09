import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LoaderPage } from './loader.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('HomePage', () => {
  let component: LoaderPage;
  let fixture: ComponentFixture<LoaderPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), LoaderPage, CommonModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the HomePage', () => {
    expect(component).toBeTruthy();
  });
});
