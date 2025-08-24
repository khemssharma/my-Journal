import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:8080/public/login';

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = { userName, password };

    return this.http.post(this.apiUrl, body, {
      headers,
      responseType: 'text'   // 👈 because backend returns plain text (JWT string)
    });
  }
}
