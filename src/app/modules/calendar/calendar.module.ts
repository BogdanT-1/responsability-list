import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarPageComponent } from './calendar-components/calendar-page/calendar-page.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CalendarPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
