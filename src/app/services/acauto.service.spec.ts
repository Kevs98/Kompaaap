import { TestBed } from '@angular/core/testing';

import { AcautoService } from './acauto.service';

describe('AcautoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcautoService = TestBed.get(AcautoService);
    expect(service).toBeTruthy();
  });
});
