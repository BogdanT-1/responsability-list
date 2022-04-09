import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    MatDividerModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
