import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  userName = '';
  password = '';
  errorMessage = '';
  rememberMe = false;

  constructor(private authService: Auth, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.userName, this.password).subscribe({
      next: (token: string) => {
        // Always store JWT in localStorage
        localStorage.setItem('jwt', token);

        // Navigate to home page
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
