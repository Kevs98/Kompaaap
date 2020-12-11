import { TestBed } from '@angular/core/testing';

import { DriverMarketService } from './driver-market.service';

describe('DriverMarketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DriverMarketService = TestBed.get(DriverMarketService);
    expect(service).toBeTruthy();
  });
});
