import { TestBed } from '@angular/core/testing';

import { PintorService } from './pintor.service';

describe('PintorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PintorService = TestBed.get(PintorService);
    expect(service).toBeTruthy();
  });
});
