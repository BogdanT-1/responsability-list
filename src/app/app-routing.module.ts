import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { RegisterComponent } from './login/register/register.component';


const routes: Routes = [
  {
    path: 'calendar',
    loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
