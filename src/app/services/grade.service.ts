import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../core/base-http.service';
import { DropDownDataModel } from '../models/dropdown-data.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  httpService = inject(BaseHttpService);
  private dataUrl = 'mock/grade.json';
  getGrades(): Observable<DropDownDataModel[]> {
    return this.httpService.get<DropDownDataModel[]>(this.dataUrl);
  }
}
