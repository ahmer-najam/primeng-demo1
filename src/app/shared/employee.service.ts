import { Employee } from './employee.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from './department.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployeeData(): Observable<any> {
    return this.http.get<any>('../../assets/employee.json');
  }

  getDepartmentData(): Observable<any> {
    return this.http.get<any>('../../assets/dept.json');
  }
}
