import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarActionsService } from 'src/app/modules/calendar/services/calendar-actions.service';
import { getCurrentDay } from '../../functions/get-current-day';
import { DailyTask } from '../../models-constants/dailytask.model';
import { DayModel } from '../../models-constants/day.model';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { ConfirmationDailogComponent } from '../confirmation-dialog/confirmation-dailog/confirmation-dailog.component';

@Component({
  selector: 'app-veiw-all-tasks-dialog',
  templateUrl: './veiw-all-tasks-dialog.component.html',
  styleUrls: ['./veiw-all-tasks-dialog.component.scss']
})
export class VeiwAllTasksDialogComponent implements OnInit {
  tasks: DailyTask[];
  viewedDate: DayModel;
  getCurrentDay = getCurrentDay;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public calendarService: CalendarActionsService,
  public dialog: MatDialog,
  public dialogRef: MatDialogRef<VeiwAllTasksDialogComponent>) {
    this.viewedDate = data.day;
  }

  async ngOnInit(): Promise<void> {
    const date = `${this.viewedDate.currentDay}-${this.viewedDate.currentMonth}-${this.viewedDate.year}`
    this.tasks = await this.calendarService.getTasksByAssignedDate(date).toPromise();
  }

  getDate() {
    return new Date(this.viewedDate.year, this.viewedDate.currentMonth - 1, this.viewedDate.currentDay);
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

    dialogRef.afterClosed().subscribe(async (res: any) => {
      if (res) {
        const date = `${this.viewedDate.currentDay}-${this.viewedDate.currentMonth}-${this.viewedDate.year}`
        this.tasks = await this.calendarService.getTasksByAssignedDate(date).toPromise();
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
        const date = `${this.viewedDate.currentDay}-${this.viewedDate.currentMonth}-${this.viewedDate.year}`
        this.tasks = await this.calendarService.getTasksByAssignedDate(date).toPromise();
      }
    });
  }

  readOnlyCheckbox() {
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
}
