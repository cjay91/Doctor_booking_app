import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsschedulelistComponent } from './doctorsschedulelist.component';

describe('DoctorsschedulelistComponent', () => {
  let component: DoctorsschedulelistComponent;
  let fixture: ComponentFixture<DoctorsschedulelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsschedulelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsschedulelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
