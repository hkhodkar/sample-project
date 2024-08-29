import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  private http = inject(HttpClient);

  get<T>(url: string): Observable<T> {
    return this.http.get(url) as Observable<T>
  }

}
