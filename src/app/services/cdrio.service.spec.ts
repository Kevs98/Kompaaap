import { TestBed } from '@angular/core/testing';

import { CdrioService } from './cdrio.service';

describe('CdrioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CdrioService = TestBed.get(CdrioService);
    expect(service).toBeTruthy();
  });
});
