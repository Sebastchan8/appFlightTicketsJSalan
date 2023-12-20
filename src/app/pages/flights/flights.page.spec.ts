import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightsPage } from './flights.page';

describe('FlightsPage', () => {
  let component: FlightsPage;
  let fixture: ComponentFixture<FlightsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FlightsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
