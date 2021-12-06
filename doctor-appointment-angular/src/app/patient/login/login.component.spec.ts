import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientLoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: PatientLoginComponent;
  let fixture: ComponentFixture<PatientLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
