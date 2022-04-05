import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { months } from 'src/app/modules/shared/models-constants/months';
import { DayModel } from 'src/app/modules/shared/models-constants/day';
import { prepareCalendar } from 'src/app/modules/shared/functions/prepare-calendar';

@Component({
  selector: 'app-calendar-body-model',
  templateUrl: './calendar-body-model.component.html',
  styleUrls: ['./calendar-body-model.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('100ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('100ms ease-out', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class CalendarBodyModelComponent implements OnInit, OnChanges {
  @Input() currentMonth: number = 0;
  @Input() currentYear: number = 0;
  daysCurrentMonth: number = 0;
  daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  months: string[] = months;
  daysPreviousMonth: number = 0;
  daysDisplayed: DayModel[] = [];
  missingDaysBefore: number = 0;
  missingDaysAfter: number = 0;
  prepareCalendar = prepareCalendar;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.daysCurrentMonth = this.daysInMonth(
      this.currentMonth,
      this.currentYear
    );
    this.daysPreviousMonth = this.daysInMonth(
      this.currentMonth - 1,
      this.currentYear
    );

    this.missingDaysBefore = this.daysOfWeek.indexOf(
      this.getDayName(new Date(this.currentYear, this.currentMonth, 1))
    );
    this.missingDaysAfter = this.daysOfWeek.length - 1 - this.daysOfWeek.indexOf(
      this.getDayName(new Date(this.currentYear, this.currentMonth, this.daysCurrentMonth)));

    this.daysDisplayed = this.prepareCalendar(
      this.missingDaysBefore,
      this.missingDaysAfter,
      this.daysCurrentMonth,
      this.daysPreviousMonth,
      this.currentMonth + 1,
      this.currentYear
    );
  }

  ngOnInit(): void {}

  daysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  getDayName(date: Date) {
    return date.toLocaleDateString('en-us', { weekday: 'long' });
  }
}
