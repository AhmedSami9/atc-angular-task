import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../../shared/services/Auth/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

<<<<<<< HEAD
  if (req.url.includes('/login') || req.url.includes('egister')) {
=======
  if (req.url.includes('/login') || req.url.includes('register')) {
>>>>>>> 7ccaa20b961203887fe7b9e9e98608c4e3ecc1dc
    return next(req);
  }

  const token = auth.getToken();
  const expiration = localStorage.getItem('expiration');

  if (!token || !expiration) {
    auth.logout();
    return throwError(() => new Error('Not authenticated'));
  }

  const expirationDate = new Date(Number(expiration) * 1000);

  if (new Date() >= expirationDate) {
    auth.logout();
    return throwError(() => new Error('Token expired'));
  }

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(cloned).pipe(
    catchError(err => {
      if (err.status === 401) {
        auth.logout();
      }
      return throwError(() => err);
    })
  );
};



