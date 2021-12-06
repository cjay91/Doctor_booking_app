import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientOwnComponent } from './patient.component';

describe('PatientOwnComponent', () => {
  let component: PatientOwnComponent;
  let fixture: ComponentFixture<PatientOwnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientOwnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientOwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
