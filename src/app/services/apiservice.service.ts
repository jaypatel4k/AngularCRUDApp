import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  readonly apiUrl = 'https://localhost:7053/api/';
  readonly photoUrl = "https://localhost:7053/Photos/";

  constructor(private http: HttpClient) { }

  // Department
  getDepartmentList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'department/GetDepartment');
  }

  addDepartment(dept: any): Observable<any> {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // return this.http.post<any>(this.apiUrl + 'department/AddDepartment', dept, httpOptions);
    //Commented above code as now Interceptor intercept header innrequest
    return this.http.post<any>(this.apiUrl + 'department/AddDepartment', dept);
  }

  updateDepartment(deptid: any, dept: any): Observable<any> {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // return this.http.put<any>(this.apiUrl + 'department/UpdateDepartment/', dept, httpOptions);
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'department/UpdateDepartment/' + deptid, dept);
  }

  deleteDepartment(deptId: number): Observable<number> {
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // return this.http.delete<number>(this.apiUrl + 'department/DeleteDepartment/' + deptId, httpOptions);
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl + 'department/DeleteDepartment/' + deptId);
  }

  // Employee
  getEmployeeList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'employee/GetEmployee');
  }

  addEmployee(emp: any): Observable<any> {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // return this.http.post<any>(this.apiUrl + 'employee/AddEmployee', emp, httpOptions);
    return this.http.post<any>(this.apiUrl + 'employee/AddEmployee', emp);
  }

  updateEmployee(emp: any): Observable<any> {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // return this.http.put<any>(this.apiUrl + 'employee/UpdateEmployee/', emp, httpOptions);
    return this.http.put<any>(this.apiUrl + 'employee/UpdateEmployee/', emp);
  }

  deleteEmployee(empId: number): Observable<number> {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // return this.http.delete<number>(this.apiUrl + 'employee/DeleteEmployee/' + empId, httpOptions);
    return this.http.delete<number>(this.apiUrl + 'employee/DeleteEmployee/' + empId);
  }

  uploadPhoto(photo: any) {
    return this.http.post(this.apiUrl + 'employee/savefile', photo);
  }

  getAllDepartmentNames(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'employee/GetAllDepartmentNames');
  }

}
