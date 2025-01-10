import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginBody } from '../interface/login-body';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  readonly apiUrl = 'https://localhost:7053/api/';

  constructor(private http: HttpClient) { }

  userlogin(credential: any): Observable<any> {
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // return this.http.post<any>(this.apiUrl + 'login', credential, httpOptions);
    return this.http.post<any>(this.apiUrl + 'login', credential);
  }

  isAuthenticatedUser(): boolean {
    if (localStorage.getItem('token') != null)
      return true;
    else
      return false;
  }

}

