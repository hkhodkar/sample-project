import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../core/base-http.service';
import { Observable } from 'rxjs';
import { SkillModel } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})

export class SkillsService {
  httpService = inject(BaseHttpService);
  private dataUrl = 'mock/skills.json';
  getSkills(): Observable<SkillModel[]> {
    return this.httpService.get<SkillModel[]>(this.dataUrl);
  }
}
