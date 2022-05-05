import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { months } from 'src/app/modules/shared/models-constants/months.constant';
import { DayModel } from 'src/app/modules/shared/models-constants/day.model';
import { prepareCalendar } from 'src/app/modules/shared/functions/prepare-calendar';
import { getCurrentDay } from 'src/app/modules/shared/functions/get-current-day';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from 'src/app/modules/shared/components/add-task-dialog/add-task-dialog.component';
import { CalendarActionsService } from '../../services/calendar-actions.service';
import { DailyTask } from 'src/app/modules/shared/models-constants/dailytask.model';
import { ConfirmationDailogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dailog/confirmation-dailog.component';
import { VeiwAllTasksDialogComponent } from 'src/app/modules/shared/components/veiw-all-tasks-dialog/veiw-all-tasks-dialog.component';

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
  @Output() toComplete = new EventEmitter<any>();
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
  getCurrentDay = getCurrentDay;
  constructor(
    private cdr: ChangeDetectorRef,
    public calendarService: CalendarActionsService,
    public dialog: MatDialog
  ) {}

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
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
    this.missingDaysAfter =
      this.daysOfWeek.length -
      1 -
      this.daysOfWeek.indexOf(
        this.getDayName(
          new Date(this.currentYear, this.currentMonth, this.daysCurrentMonth)
        )
      );

    this.refreshCalendar();
  }

  ngOnInit(): void {}

  stopOpenAction(event: any) {
    event.stopPropagation();
  }

  OpenViewAll(event: any, day: DayModel) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(VeiwAllTasksDialogComponent, {
      data: {
        day: day,
      },
      panelClass: 'custom-dialog-container',
      width: '340px',
      height: '400px',
      backdropClass: 'no-backdrop',
    });

    dialogRef.afterClosed().subscribe(async () => {
      this.refreshCalendar();
    });
  }

  opendAddTaskDialog(day: DayModel, event: any) {
    if (this.dayInPast(day)) {
      return;
    }
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: {
        day: day,
        positionRelativeToElement: {
          x: event.x,
          y: event.y,
        },
      },
      panelClass: 'custom-dialog-container',
      width: '260px',
      height: '320px',
      backdropClass: 'no-backdrop',
    });

    dialogRef.afterClosed().subscribe(async (res) => {
      if (res) {
        this.refreshCalendar();
      }
    });
  }

  editTask(selectedTask: DailyTask, event: any) {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: {
        task: selectedTask,
        positionRelativeToElement: {
          x: event.x,
          y: event.y,
        },
      },
      panelClass: 'custom-dialog-container',
      width: '260px',
      height: '350px',
      backdropClass: 'no-backdrop',
    });

    dialogRef.afterClosed().subscribe(async (res) => {
      if (res) {
        this.refreshCalendar();
      }
    });
  }

  deleteTask(task: DailyTask) {
    const dialogRef = this.dialog.open(ConfirmationDailogComponent, {
      data: {
        title: 'Delete Task',
        body: 'Are you sure you want to delete this task?',
      },
      panelClass: 'custom-dialog-container',
      width: '360px',
      height: '160px',
      backdropClass: 'no-backdrop',
    });

    dialogRef.afterClosed().subscribe(async (res) => {
      if (res) {
        await this.calendarService.deleteTask(task).toPromise();
        this.refreshCalendar();
      }
    });
  }

  highlightCurrentDay(day: DayModel) {
    const currentDay = this.getCurrentDay();
    const transformedDay = new Date(
      day.year,
      day.currentMonth - 1,
      day.currentDay
    );
    if (currentDay.getTime() === transformedDay.getTime()) {
      return true;
    }
    return false;
  }

  dayInPast(day: DayModel) {
    const currentDay = this.getCurrentDay();
    const transformedDay = new Date(
      day.year,
      day.currentMonth - 1,
      day.currentDay
    );
    if (currentDay.getTime() > transformedDay.getTime()) {
      return true;
    }
    return false;
  }

  daysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  getDayName(date: Date) {
    return date.toLocaleDateString('en-us', { weekday: 'long' });
  }

  sendUpdate(task: DailyTask, event: any) {
    if (task.done) {
      return;
    }
    this.toComplete.emit({
      id: task.ID,
      checked: event,
    });
  }

  async refreshCalendar() {
    this.daysDisplayed = await this.prepareCalendar(
      this.missingDaysBefore,
      this.missingDaysAfter,
      this.daysCurrentMonth,
      this.daysPreviousMonth,
      this.currentMonth + 1,
      this.currentYear,
      this.calendarService
    );
  }
}
