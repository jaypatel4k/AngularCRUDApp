import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  readonly apiUrl = environment.API_URL;
  readonly photoUrl = environment.API_URL + '/Photos/';

  constructor(private http: HttpClient) { }


  UploadStudent(formdata: FormData): Observable<any> {
    let headers = new HttpHeaders();
    const httpOptions = { headers: headers };

    return this.http.post(this.apiUrl + 'studentreport/UploadStudent', formdata);

  }
  UploadStudentMarks(formdata: FormData): Observable<any> {
    let headers = new HttpHeaders();

    const httpOptions = { headers: headers };

    return this.http.post(this.apiUrl + 'studentreport/UploadStudentMarks', formdata)

  }
  AddSubjectOrDivOrTesttype(formdata: FormData): Observable<any> {
    const body = { fieldtype: formdata.get("fieldtype"), fieldvalue: formdata.get("fieldvalue") };
    return this.http.post(this.apiUrl + 'studentreport/' + formdata.get("fieldtype"), body);
  }

  getStudentListByStandardAndDivision(params: HttpParams): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'studentreport/GetStudentListByDivAndStandard', { params });
  }
  getDivisionList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'studentreport/GetDivisionList');
  }
  getStandardList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'studentreport/GetStandardList');
  }
  getTestTypeList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'studentreport/GetTestTypeList');
  }
  getMonth(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'studentreport/GetMonth');
  }
  getYear(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'studentreport/GetYear');
  }
  getAllTestHeldOfMark(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'studentreport/GetAllTestHeldOfMark');
  }
  getStreamTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'studentreport/GetStreamTypeList');
  }
  getStdentTopThreeRankList(params: HttpParams): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'studentreport/GetTopThreeRankInClass', { params });
  }
  getStdentTopThreeRankAndSubjectRankList(params: HttpParams): Observable<any[]> {
    let response1 = this.http.get<any[]>(this.apiUrl + 'studentreport/GetTopThreeRankInClass', { params });
    let response2 = this.http.get<any[]>(this.apiUrl + 'studentreport/GetTopRankBySubjectInClass', { params });
    return forkJoin([response1, response2]);
  }
  getStdentTopThreeRankAndSubjectRankInAllDivisionList(params: HttpParams): Observable<any[]> {
    let response1 = this.http.get<any[]>(this.apiUrl + 'studentreport/GetTopThreeRankInAllDivision', { params });
    let response2 = this.http.get<any[]>(this.apiUrl + 'studentreport/GetTopRankBySubjectInAllDivision', { params });
    let response3 = this.http.get<any[]>(this.apiUrl + 'studentreport/GetFirstSecondThirdRankInAllDivision', { params });
    let response4 = this.http.get<any[]>(this.apiUrl + 'studentreport/GetHighestInAllSubjectInAllDivision', { params });


    return forkJoin([response1, response2, response3, response4]);
  }

  getStdent5PerecentRankList(params: HttpParams): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'studentreport/Get5PercentMarkTotal', { params });
  }



}
