import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/calendar/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  err = false;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  get f() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async register(): Promise<void> {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    const user = {
      email: this.f.email.value,
      username: this.f.username.value,
      password: this.f.password.value,
    };

    const res = await this.authService.createUser(user).toPromise()
    if (res) {
      this._snackBar.open(
        "User has been registered", "X", {
          duration: 5000
        }
      )
    }
  }

  backLogin(event: any) {
    event.stopPropagation();
    this.router.navigate(['/login']);
  }
}
