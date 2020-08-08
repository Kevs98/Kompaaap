import { TestBed } from '@angular/core/testing';

import { JobshistoryService } from './jobshistory.service';

describe('JobshistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobshistoryService = TestBed.get(JobshistoryService);
    expect(service).toBeTruthy();
  });
});
