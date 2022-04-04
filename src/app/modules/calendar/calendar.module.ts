import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarPageComponent } from './calendar-components/calendar-page/calendar-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarBodyModelComponent } from './calendar-components/calendar-body-model/calendar-body-model.component';

@NgModule({
  declarations: [
    CalendarPageComponent,
    CalendarBodyModelComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule,
    CalendarRoutingModule,
    FlexLayoutModule
  ]
})
export class CalendarModule { }
