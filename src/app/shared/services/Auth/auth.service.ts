import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(){
    
  }
  private router = inject(Router);

  private tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('userToken')
  );
  private sessionName = new BehaviorSubject<string | null>(
    localStorage.getItem('userSession')
  );
  

  token$ = this.tokenSubject.asObservable();
  name = this.sessionName.asObservable();

  setToken(token: string, expires_at: number , userName : string) {
  localStorage.setItem('userToken', token);
  localStorage.setItem('userSession', JSON.stringify({ userName }));
  localStorage.setItem('expiration', expires_at.toString());
  this.tokenSubject.next(token);
  this.sessionName.next(userName);
}


  clearToken() {
    localStorage.removeItem('userToken');
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  logout() {
    this.clearToken();
    this.router.navigate(['/login']);
  }
}
