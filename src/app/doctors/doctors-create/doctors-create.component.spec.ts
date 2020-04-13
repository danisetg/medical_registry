import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsCreateComponent } from './doctors-create.component';

describe('DoctorsCreateComponent', () => {
  let component: DoctorsCreateComponent;
  let fixture: ComponentFixture<DoctorsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
