import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CalendarActionsService } from 'src/app/modules/calendar/services/calendar-actions.service';
import { DailyTask } from '../../models-constants/dailytask.model';
import { DayModel } from '../../models-constants/day.model';
import { importances } from '../../models-constants/importantce,constants';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
})
export class AddTaskDialogComponent implements OnInit {
  private positionRelativeToElement: any;
  private currentDay: DayModel;
  public innerWidth: any;
  public innerHeight: any;
  editMode: boolean;
  taskForm: FormGroup;
  editedTask: DailyTask;
  importanceArray: string[] = importances;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public calendarService: CalendarActionsService,
    public dialogRef: MatDialogRef<AddTaskDialogComponent>
  ) {
    this.positionRelativeToElement = data.positionRelativeToElement;
    this.currentDay = data.day;
    this.editMode = !!data.task;
    this.editedTask = data.task;
  }

  ngOnInit(): void {
    this.initFormTask();
    if (this.editMode) {
      this.initTaskDetails();
    }
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    const matDialogConfig = new MatDialogConfig();
    const positionAdjutmentX = window.innerWidth/2 > this.positionRelativeToElement.x ? 1 : 0;
    const positionAdjutmentY = window.innerHeight/2 < this.positionRelativeToElement.y ? 1 : 0;

    matDialogConfig.position = {
      right: `${this.innerWidth - this.positionRelativeToElement.x - 260 * positionAdjutmentX}px`,
      top: `${this.positionRelativeToElement.y - 320 * positionAdjutmentY}px`,
    };
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  get registerFormControl() {
    return this.taskForm.controls;
  }

  getDate() {
    return new Date(this.currentDay.year, this.currentDay.currentMonth - 1, this.currentDay.currentDay);
  }

  async onCreate() {
    const newTask: DailyTask = {
      title: this.taskForm.controls.title.value,
      description: this.taskForm.controls.description.value,
      importance: this.getImportanceDigit(this.taskForm.controls.importance.value),
      done: false,
      assignedDate: `${this.currentDay.currentDay}-${this.currentDay.currentMonth}-${this.currentDay.year}`,
      ID: 0
    };

    await this.calendarService.createTask(newTask).toPromise();
    this.dialogRef.close();
  }

  async onEdit() {
    const newTask: DailyTask = {
      title: this.taskForm.controls.title.value,
      description: this.taskForm.controls.description.value,
      importance: this.getImportanceDigit(this.taskForm.controls.importance.value),
      done: this.taskForm.controls.done.value,
      assignedDate: this.editedTask.assignedDate,
      ID: this.editedTask.ID
    };

    await this.calendarService.editTask(newTask).toPromise();
    this.dialogRef.close(true);
  }

  initFormTask() {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      importance: new FormControl("Low"),
      done: new FormControl(false)
    });
  }

  initTaskDetails() {
    this.taskForm.controls.title.setValue(this.editedTask.title);
    this.taskForm.controls.description.setValue(this.editedTask.description);
    this.taskForm.controls.importance.setValue(this.getImportanceValues(this.editedTask.importance));
    this.taskForm.controls.done.setValue(this.editedTask.done);
  }

  getImportanceDigit(importance: string) {
    switch(importance) {
      case "Low": return 0;
      case "Medium": return 1;
      case "High": return 2;
      default: return 0
    }
  }

  getImportanceValues(importance: number) {
    switch(importance) {
      case 0: return "Low";
      case 1: return "Medium";
      case 2: return "High";
      default: return "Low";
    }
  }
}
