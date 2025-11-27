import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../shared/services/Auth/login.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../shared/services/Auth/auth.service';
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, PasswordModule, ToastModule],
  templateUrl: './login.component.html',
  providers: [MessageService]
})
export class LoginComponent {
  isCallApi=false
  loginForm: FormGroup;
  private readonly _AuthService =inject(AuthService)

  constructor(
    private fb: FormBuilder,
    private auth: LoginService,
    private router: Router,
    private msg: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{7,}$/)]]
    });
  }

  get email() { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }

onSubmit() {
  if (this.loginForm.invalid || this.isCallApi) return;

  this.isCallApi = true;

  this.auth.login(this.loginForm.value).subscribe({
    next: (res: any) => {
      this.isCallApi = false;

      if (res && res.token) {
        const userName = res.user?.name || 'Unknown';
        this._AuthService.setToken(res.token, res.expires_at, userName);

        this.msg.add({ severity: 'success', summary: 'Success', detail: 'Logged in successfully' });
        setTimeout(() => this.router.navigate(['/dashboard']), 500);
      }
    },
    error: (err) => {
      this.isCallApi = false;
      this.msg.add({ severity: 'error', summary: 'Login failed', detail: 'Invalid email or password' });
    }
  });
}


 goToRegister() {
    this.router.navigate(['/register']);
  }

}
