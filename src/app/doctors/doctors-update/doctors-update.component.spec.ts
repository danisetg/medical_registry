import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsUpdateComponent } from './doctors-update.component';

describe('DoctorsUpdateComponent', () => {
  let component: DoctorsUpdateComponent;
  let fixture: ComponentFixture<DoctorsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
