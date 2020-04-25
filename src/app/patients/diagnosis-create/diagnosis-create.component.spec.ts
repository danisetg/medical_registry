import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisCreateComponent } from './diagnosis-create.component';

describe('DiagnosisCreateComponent', () => {
  let component: DiagnosisCreateComponent;
  let fixture: ComponentFixture<DiagnosisCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
