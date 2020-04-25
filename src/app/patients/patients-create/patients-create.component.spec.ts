import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsCreateComponent } from './patients-create.component';

describe('PatientsCreateComponent', () => {
  let component: PatientsCreateComponent;
  let fixture: ComponentFixture<PatientsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
