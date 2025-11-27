import { Component, OnDestroy } from '@angular/core';
import { RegisterService } from '../../../shared/services/Auth/register.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, ToastModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnDestroy {

  registerForm: FormGroup;
  isCallApi=false

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private msg: MessageService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{7,}$/)]]
    });
  }

  get name() { return this.registerForm.get('name')!; }
  get email() { return this.registerForm.get('email')!; }
  get password() { return this.registerForm.get('password')!; }

 onSubmit() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  if (!this.isCallApi) {
    this.isCallApi = true;
    this.registerService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('userToken', res.token);
        this.isCallApi = false;
        this.msg.add({ severity: 'success', summary: 'Success', detail: 'Registered successfully' });
        setTimeout(() => this.router.navigate(['/login']), 200);
      },
      error: (err) => {
        this.msg.add({ severity: 'error', summary: 'Register failed', detail: 'Check your data and try again' });
        this.isCallApi = false;
        console.log('Register failed:', err);
      }
    });
  }
}
  ngOnDestroy(): void {
    
    
  }
   goToLogin() {
    this.router.navigate(['/login']);
  }

}
