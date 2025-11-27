import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { inject } from '@angular/core';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const msg = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let detail = '';

      if (error.error instanceof ErrorEvent) {
        
        detail = error.error.message;
      } else if (error.status === 0) {
        
        detail = 'Cannot connect to server. Check your network or API URL.';
      } else {
       
        detail = error.error?.message || error.message || 'An unexpected error occurred.';
      }

      
      msg.add({
        severity: 'error',
        summary: `HTTP ${error.status || 'Error'}`,
        detail: detail,
        life: 5000
      });

      return throwError(() => error);
    })
  );
};
