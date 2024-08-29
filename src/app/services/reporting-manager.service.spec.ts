import { TestBed } from '@angular/core/testing';

import { ReportingManagerService } from './reporting-manager.service';

describe('ReportingManagerService', () => {
  let service: ReportingManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportingManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
