import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  readonly apiUrl = 'https://localhost:7053/api/';
  readonly photoUrl = "https://localhost:7053/Photos/";

  constructor(private http: HttpClient) { }


  UploadStudentData(formdata: FormData): Observable<any> {
    let headers = new HttpHeaders();

    // headers.append('Content-Type', 'multipart/form-data');

    // headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this.http.post(this.apiUrl + 'student/UploadStudentData', formdata)

  }
}
