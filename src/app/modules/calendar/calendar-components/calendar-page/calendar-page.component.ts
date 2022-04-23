import { Component, OnInit, ViewChild } from '@angular/core';
import { getCurrentDay } from 'src/app/modules/shared/functions/get-current-day';
import { months } from 'src/app/modules/shared/models-constants/months.constant';
import { CalendarActionsService } from '../../services/calendar-actions.service';
import { CalendarBodyModelComponent } from '../calendar-body-model/calendar-body-model.component';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent implements OnInit {
  currentMonth: number = 1;
  currentYear: number = 1;
  @ViewChild(CalendarBodyModelComponent)
  calendarBody: CalendarBodyModelComponent;
  constructor(public calendarService: CalendarActionsService) {}
  months: string[] = months;
  tasksToComplete: number[] = [];
  getCurrentDay = getCurrentDay;
  ngOnInit(): void {
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
  }

  modifyDate(direction: number) {
    if (this.currentMonth + 1 * direction > 11) {
      this.currentYear++;
      this.currentMonth = 0;
      return;
    }

    if (this.currentMonth + 1 * direction < 0) {
      this.currentYear--;
      this.currentMonth = 11;
      return;
    }

    this.currentMonth = this.currentMonth + 1 * direction;
  }

  addToComplete(event: any) {
    if (event.checked) {
      this.tasksToComplete.push(event.id);
    } else {
      const index = this.tasksToComplete.indexOf(event.id);
      if (index > -1) {
        this.tasksToComplete.splice(index, 1);
      }
    }
  }

  async completeTasks() {
    await this.calendarService.completeTasks(this.tasksToComplete).toPromise();
    this.calendarBody.refreshCalendar();
    this.tasksToComplete = [];
  }
}
