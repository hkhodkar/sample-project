import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../core/base-http.service';
import { DropDownDataModel } from '../models/dropdown-data.model';

@Injectable({
  providedIn: 'root'
})
export class ReportingManagerService {

  httpService = inject(BaseHttpService);
  private dataUrl = 'mock/reportingManager.json';
  getReportingMangers(): Observable<DropDownDataModel[]> {
    return this.httpService.get<DropDownDataModel[]>(this.dataUrl);
  }
}
