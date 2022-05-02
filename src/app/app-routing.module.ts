import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { RegisterComponent } from './login/register/register.component';


const routes: Routes = [
  {
    path: 'calendar',
    loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule)
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
