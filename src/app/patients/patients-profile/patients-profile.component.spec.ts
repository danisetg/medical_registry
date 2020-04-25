import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsProfileComponent } from './patients-profile.component';

describe('PatientsProfileComponent', () => {
  let component: PatientsProfileComponent;
  let fixture: ComponentFixture<PatientsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
