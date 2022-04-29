import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/calendar/services/auth.service';
import { TokenStorageService } from 'src/app/modules/shared/services/session-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  err = false;
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get f() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    const user = {
      email: this.f.email.value,
      password: this.f.password.value,
    };

    this.authService.loginUser(user).subscribe(
      (data: any) => {
        if (data) {
          this.tokenStorage.saveToken(data.access_token);
          this.tokenStorage.saveUser(`${data.email}-${data.username}`);
          this.router.navigate(['/calendar']);
          this.loading = false;
        }
      },
      (err) => {
        this.err = true;
        this.loading = false;
      }
    );
  }
}
