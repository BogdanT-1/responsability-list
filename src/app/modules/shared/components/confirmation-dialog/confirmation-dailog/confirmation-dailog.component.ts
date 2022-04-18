import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dailog',
  templateUrl: './confirmation-dailog.component.html',
  styleUrls: ['./confirmation-dailog.component.scss'],
})
export class ConfirmationDailogComponent implements OnInit {
  title: string;
  body: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.body = data.body;
  }

  ngOnInit(): void {}
}
