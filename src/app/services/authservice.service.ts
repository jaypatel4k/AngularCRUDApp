import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginBody } from '../interface/login-body';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  ///readonly apiUrl = 'https://localhost:7053/api/';
  readonly apiUrl = environment.API_URL;
  constructor(private http: HttpClient) { }

  userlogin(credential: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', credential);
  }

  isAuthenticatedUser(): boolean {
    if (localStorage.getItem('token') != null) {
      console.log(localStorage.getItem("tokenExpiration"));
      return true;
    }
    else
      return false;
  }

}

