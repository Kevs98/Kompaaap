import { TestBed } from '@angular/core/testing';

import { BellezaService } from './belleza.service';

describe('BellezaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BellezaService = TestBed.get(BellezaService);
    expect(service).toBeTruthy();
  });
});
