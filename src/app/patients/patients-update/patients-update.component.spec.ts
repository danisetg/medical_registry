import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsUpdateComponent } from './patients-update.component';

describe('PatientsUpdateComponent', () => {
  let component: PatientsUpdateComponent;
  let fixture: ComponentFixture<PatientsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
