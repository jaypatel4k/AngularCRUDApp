import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  //console.log(token + "=====");
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
  return next(req).pipe(tap(() => { },
    (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
          return;
        }
        //this.router.navigate(['login']);
      }
    }));
};
