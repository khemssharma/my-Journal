import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  constructor(private authService: Auth) {}

  onLogin(): void {
    this.authService.login(this.userName, this.password).subscribe({
      next: (token: string) => {
        console.log('JWT:', token);
        localStorage.setItem('jwt', token);
        alert('Login successful!');
      },
      error: () => {
        this.errorMessage = 'Login failed';
      }
    });
  }
}
