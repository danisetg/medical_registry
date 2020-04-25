import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsShowComponent } from './patients-show.component';

describe('PatientsShowComponent', () => {
  let component: PatientsShowComponent;
  let fixture: ComponentFixture<PatientsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
