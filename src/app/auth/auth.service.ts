import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //TODO Add a developer / production switch here.. vv
  // private apiUrl = 'https://salesinspectorcms-1-q08b.onrender.com/api/auth';
  private apiUrl = 'http://localhost:3000/api/auth';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  register(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAuthenticated() : boolean {
    return !!localStorage.getItem('token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
