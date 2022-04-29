import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarActionsService } from 'src/app/modules/calendar/services/calendar-actions.service';
import { DailyTask } from '../../models-constants/dailytask.model';
import { DayModel } from '../../models-constants/day.model';

@Component({
  selector: 'app-veiw-all-tasks-dialog',
  templateUrl: './veiw-all-tasks-dialog.component.html',
  styleUrls: ['./veiw-all-tasks-dialog.component.scss']
})
export class VeiwAllTasksDialogComponent implements OnInit {
  tasks: DailyTask[];
  viewedDate: DayModel;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public calendarService: CalendarActionsService,
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
}
