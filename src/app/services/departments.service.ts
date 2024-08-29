import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../core/base-http.service';
import { DropDownDataModel } from '../models/dropdown-data.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  httpService = inject(BaseHttpService);
  private dataUrl = 'mock/departments.json';
  getDepartments(): Observable<DropDownDataModel[]> {
    return this.httpService.get<DropDownDataModel[]>(this.dataUrl);
  }
}
