import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { LoadspinnerService } from '../services/loadspinner.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const loadspinnerservice = inject(LoadspinnerService);
  //service.hide();

  if (req.url.length > 0) {
    loadspinnerservice.show();
  }

  if (token == null) {
    if (req.url.indexOf("Upload") > 0) {
      req = req.clone({
        setHeaders: {
          'enctype': 'multipart/form-data',
        }
      });
    }
    else {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
  if (token != null) {
    if (req.url.indexOf("Upload") > 0) {
      req = req.clone({
        setHeaders: {
          'enctype': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
    }
    else {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    }
  }
  return next(req).pipe(tap({
    next: (event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        loadspinnerservice.hide();
      }
    },
    error: (error) => {
      loadspinnerservice.hide();
      console.error(error.message);
      //alert(error.error.message);
      //alert(error.status);
      throwError(() => error.status);
    }
  }));

};
