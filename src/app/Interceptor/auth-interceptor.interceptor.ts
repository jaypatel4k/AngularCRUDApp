import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { LoadspinnerService } from '../services/loadspinner.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const service = inject(LoadspinnerService);
  //service.hide();

  if (req.url.length > 0) {
    service.show();
  }
  if (token == null) {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
    //console.log(req);
  }
  if (token != null) {
    if (req.url.indexOf("UploadStudent") > 0) {
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

    console.log(req);
  }
  return next(req).pipe(tap({
    next: (event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        service.hide();
      }
    },
    error: (error) => {
      service.hide();
    }
  })


  );
};
