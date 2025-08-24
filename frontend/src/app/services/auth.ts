import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = { userName, password };
    console.log(body);

    return this.http.post(`${this.apiUrl}/public/login`, body, {
      headers,
      responseType: 'text'   // 👈 because backend returns plain text (JWT string)
    });
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jwt');
    }
    return null;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }
  
  getJournals(): Observable<any> {
    return this.http.get(`${this.apiUrl}/journal`, { headers: this.getAuthHeaders() });
  }
}
