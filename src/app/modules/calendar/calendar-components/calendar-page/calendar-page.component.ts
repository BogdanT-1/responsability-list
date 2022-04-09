import { Component, OnInit } from '@angular/core';
import { getCurrentDay } from 'src/app/modules/shared/functions/get-current-day';
import { months } from 'src/app/modules/shared/models-constants/months.constant';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent implements OnInit {
  currentMonth: number = 1;
  currentYear: number = 1;
  constructor() {}
  months: string[] = months;
  getCurrentDay = getCurrentDay;
  ngOnInit(): void {
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
  }

  modifyDate(direction: number) {
    if(this.currentMonth + 1 * direction > 11) {
      this.currentYear++;
      this.currentMonth = 0;
      return;
    }

    if(this.currentMonth + 1 * direction < 0) {
      this.currentYear--;
      this.currentMonth = 11;
      return;
    }

    this.currentMonth = this.currentMonth + 1 * direction;
  }
}
