import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MerchPage } from './merch.page';

describe('MerchPage', () => {
  let component: MerchPage;
  let fixture: ComponentFixture<MerchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
