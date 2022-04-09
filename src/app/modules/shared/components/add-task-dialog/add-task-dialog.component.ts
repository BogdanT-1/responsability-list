import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DayModel } from '../../models-constants/day.model';

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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTaskDialogComponent>
  ) {
    this.positionRelativeToElement = data.positionRelativeToElement;
    this.currentDay = data.day;
    console.log(this.currentDay);
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    const matDialogConfig = new MatDialogConfig();
    const positionAdjutmentX = window.innerWidth/2 > this.positionRelativeToElement.x ? 1 : 0;
    const positionAdjutmentY = window.innerHeight/2 < this.positionRelativeToElement.y ? 1 : 0;

    matDialogConfig.position = {
      right: `${this.innerWidth - this.positionRelativeToElement.x - (this.innerWidth*10/100) * positionAdjutmentX}px`,
      top: `${this.positionRelativeToElement.y + 2 - (this.innerHeight*15/100) * positionAdjutmentY}px`,
    };
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }
}
