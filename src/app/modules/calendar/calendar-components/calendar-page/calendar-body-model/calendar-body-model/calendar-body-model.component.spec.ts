import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarBodyModelComponent } from './calendar-body-model.component';

describe('CalendarBodyModelComponent', () => {
  let component: CalendarBodyModelComponent;
  let fixture: ComponentFixture<CalendarBodyModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarBodyModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarBodyModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
