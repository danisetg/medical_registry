import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsShowComponent } from './doctors-show.component';

describe('DoctorsShowComponent', () => {
  let component: DoctorsShowComponent;
  let fixture: ComponentFixture<DoctorsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
