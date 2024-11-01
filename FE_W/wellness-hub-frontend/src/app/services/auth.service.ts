import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  // Registrazione
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Login
  login(user: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }
}
