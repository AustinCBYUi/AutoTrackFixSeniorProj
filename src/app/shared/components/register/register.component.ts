import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      this.authService.register(email, password).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => this.errorMessage = err.error.message || 'Registration failed.'
      });
    }
  }
}
