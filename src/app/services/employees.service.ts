import { inject, Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseHttpService } from '../core/base-http.service';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  httpService = inject(BaseHttpService);
  private dataUrl = 'mock/employee.json';
  getEmployees(): Observable<EmployeeModel[]> {
    return this.httpService.get<EmployeeModel[]>(this.dataUrl);
  }

  findById(id: number): Observable<EmployeeModel | undefined> {
    return this.httpService.get<EmployeeModel[]>(this.dataUrl).pipe(
      map((employees) => employees.find((employee) => employee.id === id),),
    );
  }
}
