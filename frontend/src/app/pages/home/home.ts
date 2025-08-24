import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  healthStatus: string = '';
  journals: any[] = [];
  errorMessage = '';

  constructor(private auth: Auth) {}

  ngOnInit(): void {

    // Protected call
    this.auth.getJournals().subscribe({
      next: (res:any) => {
        this.journals = res;
      },
      error: (err:any) => {
        this.errorMessage = 'Unauthorized or failed to load journals';
      }
    });
  }
}
