import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyticketsPage } from './mytickets.page';

describe('MyticketsPage', () => {
  let component: MyticketsPage;
  let fixture: ComponentFixture<MyticketsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyticketsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
