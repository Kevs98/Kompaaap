import { TestBed } from '@angular/core/testing';

import { FletesService } from './fletes.service';

describe('FletesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FletesService = TestBed.get(FletesService);
    expect(service).toBeTruthy();
  });
});
