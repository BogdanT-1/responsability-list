import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddTaskDialogComponent } from './modules/shared/components/add-task-dialog/add-task-dialog.component';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDailogComponent } from './modules/shared/components/confirmation-dialog/confirmation-dailog/confirmation-dailog.component';
import { VeiwAllTasksDialogComponent } from './modules/shared/components/veiw-all-tasks-dialog/veiw-all-tasks-dialog.component';
import { interceptorProvider } from './core/interceptors/request-interceptor';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { RegisterComponent } from './login/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskDialogComponent,
    ConfirmationDailogComponent,
    LoginPageComponent,
    VeiwAllTasksDialogComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
