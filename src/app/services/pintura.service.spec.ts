import { TestBed } from '@angular/core/testing';

import { PinturaService } from './pintura.service';

describe('PinturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PinturaService = TestBed.get(PinturaService);
    expect(service).toBeTruthy();
  });
});
