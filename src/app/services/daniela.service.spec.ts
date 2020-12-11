import { TestBed } from '@angular/core/testing';

import { DanielaService } from './daniela.service';

describe('DanielaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DanielaService = TestBed.get(DanielaService);
    expect(service).toBeTruthy();
  });
});
