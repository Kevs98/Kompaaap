import { TestBed } from '@angular/core/testing';

import { TaxiService } from './taxi.service';

describe('TaxiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaxiService = TestBed.get(TaxiService);
    expect(service).toBeTruthy();
  });
});
