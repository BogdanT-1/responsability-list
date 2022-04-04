import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule
  ],
  exports: [
    MatDividerModule,
    MatIconModule
  ]
})
export class MaterialModule { }
