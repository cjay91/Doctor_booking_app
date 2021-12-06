import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyappointmentslistComponent } from './myappointmentslist.component';

describe('MyappointmentslistComponent', () => {
  let component: MyappointmentslistComponent;
  let fixture: ComponentFixture<MyappointmentslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyappointmentslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyappointmentslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
